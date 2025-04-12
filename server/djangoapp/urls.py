from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from . import views

app_name = 'djangoapp'
urlpatterns = [
    # Path for registration
    path(route='register', view=views.registration, name='register'),  # Changed from register_user to registration
    # Path for login
    path(route='login', view=views.login_user, name='login'),
    # Path for logout
    path(route='logout', view=views.logout_request, name='logout'),  # Changed from logout_user to logout_request
    # Additional paths for dealer reviews and add review can be added here
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)