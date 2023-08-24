from django.urls import path
from .import views
from .views import *
from django.views.decorators.csrf import csrf_exempt
urlpatterns=[
    path('user/signup/',csrf_exempt(SignUpView.as_view()),name='user-signup'),
    path('user/signin/',csrf_exempt(SignInView.as_view()),name='user-login'),
    path('movies/',csrf_exempt(AddMovieAPIView.as_view()),name='add-movie'),
    path('movies/del/<int:movie_id>/',AddMovieAPIView.as_view(),name='delete-movie'),
    path('movies/list/',csrf_exempt(GetMovieViews.as_view()),name='list-movie'),
    path('movies/all/',csrf_exempt(MoviesAPI.as_view()),name='list-movie'),
    path('movies/genres/', GenreList.as_view(), name='genre-list'),
    path('movies/language/', UniqueLanguagesAPI.as_view(), name='unique-languages'),
    path('movie/<int:id>/', GetMovieDetailsViews.as_view(), name='movie-detail'),
    path('movies/<int:movie_id>/add_theater/', TheaterCreateView.as_view(), name='add-theater-to-movie'),
    path('seats/', SeatView.as_view(), name='Add-seat-to-theater'),
    path('seats/<int:id>/', SeatView.as_view(), name='update-seat-no'),
    path('movies/theater/<int:id>/', TheaterSeats.as_view(), name='find-seat-to-the-theater'),
    path('movies/seatbooking/', BookingView.as_view(), name='Booking-to-theater'),
    path('movies/seatbooking/<int:id>', BookingView.as_view(), name='Booking-to-theater'),
    path('theater/<int:movie_id>/',TheaterView.as_view(), name='Search-theater-movie_id' ),
# hi code

]