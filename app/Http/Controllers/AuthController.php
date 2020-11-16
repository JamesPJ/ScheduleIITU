<?php

namespace App\Http\Controllers;

use App\TokenStore\TokenCache;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Microsoft\Graph\Graph;
use Microsoft\Graph\Model;
use \League\OAuth2\Client\Provider\GenericProvider;
use \League\OAuth2\Client\Provider\Exception\IdentityProviderException;

class AuthController extends Controller
{
  
  public function login()
  {
    // ! Initialize the OAuth client
    $oauthClient = new GenericProvider([
      'clientId'                => env('OAUTH_APP_ID'),
      'clientSecret'            => env('OAUTH_APP_PASSWORD'),
      'redirectUri'             => env('OAUTH_REDIRECT_URI'),
      'urlAuthorize'            => env('OAUTH_AUTHORITY') . env('OAUTH_AUTHORIZE_ENDPOINT'),
      'urlAccessToken'          => env('OAUTH_AUTHORITY') . env('OAUTH_TOKEN_ENDPOINT'),
      'urlResourceOwnerDetails' => '',
      'scopes'                  => env('OAUTH_SCOPES')
    ]);

    // ! Save client state so we can validate in openID
    session(['oauthState' => $oauthClient->getState()]);

    // ! Redirect to login.microsoftonline.com signin page
    return redirect()->away($oauthClient->getAuthorizationUrl());
  }

  public function openID(Request $request)
  {
    // ! Validate state
    $expectedState = session('oauthState');
    $request->session()->forget('oauthState');
    $providedState = $request->query('state');

    // ! If there is no expected state in the session,
    // ! do nothing and redirect to the home page.
    if (!isset($expectedState)) {
      return redirect()->route('index');
    }

    // ! If expected state not match to provided state
    if (!isset($providedState) || $expectedState != $providedState) {
      return redirect()->route('index')
        ->with('error', 'Invalid authorization state');
    }

    // ! Authorization code should be in the "code" query param
    $authCode = $request->query('code');
    if (isset($authCode)) {
      // ! Initialize the OAuth client
      $oauthClient = new GenericProvider([
        'clientId'                => env('OAUTH_APP_ID'),
        'clientSecret'            => env('OAUTH_APP_PASSWORD'),
        'redirectUri'             => env('OAUTH_REDIRECT_URI'),
        'urlAuthorize'            => env('OAUTH_AUTHORITY') . env('OAUTH_AUTHORIZE_ENDPOINT'),
        'urlAccessToken'          => env('OAUTH_AUTHORITY') . env('OAUTH_TOKEN_ENDPOINT'),
        'urlResourceOwnerDetails' => '',
        'scopes'                  => env('OAUTH_SCOPES')
      ]);

      try {
        // ! Make the token request
        $accessToken = $oauthClient->getAccessToken('authorization_code', [
          'code' => $authCode
        ]);

        $graph = new Graph();
        $graph->setAccessToken($accessToken->getToken());

        $user = $graph->createRequest('GET', '/me?$select=displayName,mail')
          ->setReturnType(Model\User::class)
          ->execute();

        $tokenCache = new TokenCache();
        $tokenCache->storeTokens($accessToken, $user);

        $userName = $user->getDisplayName();
        $userEmail = $user->getMail();

        // ! Checking if user name and login accessed
        if (isset($userName) && isset($userEmail)) {
          // ! Check existing in database
          $user = User::where('email', $userEmail)->first();
          if (isset($user)) {
            // ! If Exist redirect to profile
            return redirect()->route('profile');
          }

          // ! If not Exist create new user
          User::create(['fullname' => $userName, 'email' => $userEmail]);
          return redirect()->route('profile');
        }

        return redirect()->route('index')
          ->with('error', 'Authentication error, try again!');
      } catch (IdentityProviderException $e) {
        return redirect()->route('index')
          ->with('error', 'Error requesting Open ID');
      }
    }

    return redirect()->route('index')
      ->with('error', $request->query('error_description'));
  }

  public function logout()
  {
    $tokenCache = new TokenCache();
    $tokenCache->clearTokens();
    return redirect()->route('index');
  }
}
