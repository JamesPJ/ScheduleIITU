<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Microsoft\Graph\Graph;
use Microsoft\Graph\Model;
use \League\OAuth2\Client\Provider\GenericProvider;
use \League\OAuth2\Client\Provider\Exception\IdentityProviderException;

class AuthController extends Controller
{

  /**
   * Client - generates OAuth Client
   *
   * @return GenericProvider
   */
  private function client()
  {
    return new GenericProvider([
      'clientId'                => env('OAUTH_APP_ID'),
      'clientSecret'            => env('OAUTH_APP_PASSWORD'),
      'redirectUri'             => env('OAUTH_REDIRECT_URI'),
      'urlAuthorize'            => env('OAUTH_AUTHORITY') . env('OAUTH_AUTHORIZE_ENDPOINT'),
      'urlAccessToken'          => env('OAUTH_AUTHORITY') . env('OAUTH_TOKEN_ENDPOINT'),
      'urlResourceOwnerDetails' => '',
      'scopes'                  => env('OAUTH_SCOPES')
    ]);
  }


  /**
   * Login - generates auth url
   * and saves state to session
   * 
   * @return redirect to auth url
   */
  public function login()
  {
    $oauthClient = $this->client();
    $authUrl = $oauthClient->getAuthorizationUrl();
    session(['oauthState' => $oauthClient->getState()]);

    return redirect()->away($authUrl);
  }


  /**
   * OpenID - resolves authCode and gets user fullname and email
   * from login.microsoftonline.com
   * 
   * @param  Request $request
   * @return void
   */
  public function openID(Request $request)
  {
    $expectedState = session('oauthState');
    $request->session()->forget('oauthState');
    $providedState = $request->query('state');
    $authCode = $request->query('code');

    if (!isset($expectedState)) {
      return redirect()->route('index');
    }
    if ($expectedState != $providedState) {
      return redirect()->route('index')
        ->with('error', 'Invalid authorization state');
    }

    if (isset($authCode)) {
      $oauthClient = $this->client();

      try {
        $accessToken = $oauthClient->getAccessToken('authorization_code', ['code' => $authCode]);
        $graph = new Graph();
        $graph->setAccessToken($accessToken->getToken());
        $user = $graph->createRequest('GET', '/me?$select=displayName,mail')
          ->setReturnType(Model\User::class)
          ->execute();
        $userName = $user->getDisplayName();
        $userEmail = $user->getMail();
        // n.alpysbay@edu.iitu.kz


        /**
         * User logins if exist
         * Register if not
         */
        if (isset($userEmail) && isset($userEmail)) {
          $user = User::where('email', $userEmail)->first();

          if (!isset($user)) {
            $domain = substr($userEmail, strpos($userEmail, '@') + 1);
            if ($domain !== env('OAUTH_DOMAIN')) {
              return redirect()->route('index')
                ->with('error', 'Looks like you are not from our university');
            }
            $user = User::create(['fullname' => $userName, 'email' => $userEmail]);
            $mail = substr($userEmail, 0, strpos($userEmail, '@'));
            if (is_numeric($mail)) {
              $role = 'student';
              $student = Student::create(['user_id' => $user->id]);
              $user->student()->save($student);
            } else {
              return redirect()->route('index')
                ->with('error', 'Please contact with HR to add you!');
            }
            $user->roles()->attach(Role::where('name', $role)->first()->id);

            session(['user' => $user]);
            return redirect()->route('select')
              ->with('success', 'Registration is completed');
          }
          session(['user' => $user]);

          return redirect()->route('profile.index');
        }



        return redirect()->route('index')
          ->with('error', 'Authentication error, try again!');
      } catch (IdentityProviderException $e) {
        return redirect()->route('index')
          ->with('error', 'Error requesting Open ID');
      }
    } else {
      return redirect()->route('index')
        ->with('error', 'Error on querying code of authorization');
    }
  }


  /**
   * Logout - delete User Model from session
   * 
   * @return redirect to 'index' route
   */
  public function logout()
  {
    session()->forget('user');
    return redirect()->route('index');
  }
}
