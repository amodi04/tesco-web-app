from django.urls import include, re_path, path

from .views import GroupView

accounts_urlpatterns = [
    re_path(r'^api/v1/', include('djoser.urls')),
    re_path(r'^api/v1/', include('djoser.urls.authtoken')),
    path('api/v1/groups/', GroupView.as_view(), name='groups'),
]