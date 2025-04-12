from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    # Admin interface
    path('admin/', admin.site.urls),
    
    # Django app API endpoints
    path('djangoapp/', include('djangoapp.urls')),
    
    # Static pages
    path('', TemplateView.as_view(template_name="Home.html"), name='home'),
    path('about/', TemplateView.as_view(template_name="About.html"), name='about'),
    path('contact/', TemplateView.as_view(template_name="Contact.html"), name='contact'),
    
    # React frontend routes
    path('login/', TemplateView.as_view(template_name="index.html"), name='login'),
    path('logout/', TemplateView.as_view(template_name="index.html"), name='logout'),
    path('register/', TemplateView.as_view(template_name="index.html"), name='register'),
    
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)