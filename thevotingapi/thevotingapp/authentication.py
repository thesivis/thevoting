from django.contrib.auth.models import User
from django.contrib import auth
from django.middleware.csrf import CsrfViewMiddleware
from django.utils.translation import ugettext_lazy as _
from rest_framework import authentication, exceptions


class ExampleAuthentication(authentication.SessionAuthentication):

    def authenticate(self, request):
        print('#########################3')
        username = request.GET.get("username")
        if not username:
            return None

        novo = User(username=username)
        return (novo, None)



#curl -X POST http://127.0.0.1:8000/api-token-auth/ -H 'content-type: application/json' -d '{"username":"teste","password":"123"}'
#curl -X GET http://127.0.0.1:8000/votacao/ -H 'Authorization: Token 5ca2bc9940369ed9d4d0ad179f3465afe939e51b'

class ExampleAuthentication2:

    def authenticate(self, request, username=None, password =None):
        print('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
        if not username:
            return None

        novo = User(username=username)
        novo._set_pk_val(1)
        return novo








class CSRFCheck(CsrfViewMiddleware):
    def _reject(self, request, reason):
        # Return the failure reason instead of an HttpResponse
        return reason


class DRFSessionAuthentication(authentication.SessionAuthentication):
    'Session authentication against username/password for DRF'

    def authenticate(self, request):
        '''
        Returns a User if a correct username and password have been supplied
        using Django Session Authentication. Otherwise returns None.
        '''
        print('dentrooooooooooooooooooo', request.data, request.session.get('user'),getattr(request._request, 'user', None))
        username = request.data.get('username')
        password = request.data.get('password')
        if(username is None):
            username = request.GET.get('username')
            password = request.GET.get('password')
        print('username:',username)

        return self.authenticate_credentials(username, password, request)

    def authenticate_credentials(self, username, password, request=None):
        '''
        Authenticate the userid and password against username and password
        with optional request for context.
        '''


        if username is None:
            raise exceptions.AuthenticationFailed(
                _('Invalid username/password.')
            )

        user = User(username=username)

        if not user.is_active:
            raise exceptions.AuthenticationFailed(
                _('User inactive or deleted.')
            )

        self.enforce_csrf(request)
        user._set_pk_val(1)
        print(request,user)
        #auth.login(request,user)
        return (user, None)

    def authenticate_header(self, request):
        return 'Session'

    def enforce_csrf(self, request):
        'Enforce CSRF validation for session based authentication.'
        print('---------------------')
        reason = CSRFCheck().process_view(request, None, (), {})
        if reason:
            # CSRF failed, bail with explicit error message
            raise exceptions.PermissionDenied('CSRF Failed: %s' % reason)
        
        #return 
