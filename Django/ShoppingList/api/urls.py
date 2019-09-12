from django.urls import path
from . import views

urlpatterns = [
    path('<int:pk>/', views.ShoppingListView.as_view()),
    path('<int:pk>/list/', views.UserShoppingListView.as_view()),
    path('new_item/', views.ItemNew.as_view()),
    path('new_list/', views.ShoppingListNew.as_view()),
    path('<int:l_pk>/<int:pk>/', views.ItemView.as_view()),
    path('<int:pk>/delete_item/', views.ItemDelete.as_view()),
    path('<int:pk>/delete_list/', views.ListDelete.as_view()),
    path('scrap/<str:name>/', views.ItemData.as_view()),
    path('user/', views.UserView.as_view()),
    path('user/new/', views.UserCreate.as_view())
]