from django.views import View
from .serializers import *
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.core.paginator import Paginator
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Sum
from decimal import Decimal
import json
from .models import *


# Create your views here.
class SignUpView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return JsonResponse(
                {"refresh": str(refresh), "access": str(refresh.access_token)},
                status=status.HTTP_201_CREATED,
            )
        return JsonResponse(serializer.error, status.HTTP_400_BAD_REQUEST, safe=False)


class SignInView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        user_data = {}
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            user_data = {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "name": user.name,
                "mobile_number": user.mobile_number,
                "is_staff": user.is_staff,
                "is_superuser": user.is_superuser,
            }
            return JsonResponse(
                {
                    "user": user_data,
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
                status=status.HTTP_201_CREATED,
            )
        return JsonResponse(serializer.error, status.HTTP_400_BAD_REQUEST, safe=False)


class UserUpdatView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = get_object_or_404(User, pk=request.user.id)
        try:
            data = json.loads(request.body)
            serializer = UserSerializer(user, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status.HTTP_202_ACCEPTED)
            return JsonResponse(serializer.errors, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)


class UserProfile(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
            serializer = UserSerializer(user)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response(
                {"message": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )

    def put(self, request, pk=None):
        if pk:
            try:
                user = User.objects.get(pk=pk)

                serializer = UserSerializer(user, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                return Response(
                    {"message": "User not found"}, status=status.HTTP_404_NOT_FOUND
                )
        print(request.data)
        # user = User.objects.get(email=request.data['email'], username=request.data['username'])
        # user.set_password(request.data["password"])
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response(
                {"message": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )


class ResetPasswordView(APIView):
    def put(self, request):
        data = json.loads(request.body)
        username = request.GET.get("username")
        try:
            user = User.objects.get(
                email=request.data["email"], username=request.data["username"]
            )

            if user:
                user.set_password(data["password"])
                user.save()
                return JsonResponse(
                    {"message": "Password successfully updated"},
                    status=status.HTTP_200_OK,
                    safe=False,
                )
            return JsonResponse(
                {"message": "No user found!!"},
                status=status.HTTP_400_BAD_REQUEST,
                safe=False,
            )
        except:
            return JsonResponse(
                {"message": "No user found!!"},
                status=status.HTTP_400_BAD_REQUEST,
                safe=False,
            )


class AddMovieAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        serializer = MovieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, movie_id):
        try:
            # Filter movies by id
            movie = Movie.objects.get(id=movie_id)
            # Delete the movie
            movie.delete()
            return Response(
                {"message": "Movie deleted successfully"},
                status=status.HTTP_204_NO_CONTENT,
            )
        except Movie.DoesNotExist:
            return Response(
                {"message": "Movie not found"}, status=status.HTTP_404_NOT_FOUND
            )

    def put(self, request, movie_id):
        movie = Movie.objects.get(id=movie_id)
        if not movie:
            return Response(
                {"message": "Movie not found"}, status=status.HTTP_404_NOT_FOUND
            )
        serializer = MovieSerializer(movie, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetMovieViews(APIView):
    permission_classes = [IsAuthenticated & IsAdminUser]

    def get(self, request):
        page_number = request.GET.get("page", 1)
        movies = Movie.objects.all().order_by("id")
        paginator = Paginator(movies, 2)
        page = paginator.get_page(page_number)
        movie_on_page = page.object_list
        movie_serialized = MovieSerializer(movie_on_page, many=True).data
        return JsonResponse(
            {
                "results": movie_serialized,
                "num_pages": paginator.num_pages,
                "total_user": movies.count(),
            }
        )


class GetMovieDetailsViews(APIView):
    def get(self, request, id):
        try:
            product = Movie.objects.get(id=id)
            serializer = MovieSerializer(product)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Movie.DoesNotExist:
            return Response(
                {"detail": "Product not found"}, status=status.HTTP_404_NOT_FOUND
            )


class MoviesAPI(View):
    def get(self, request):
        # fetching all movies with optional filtering based on genre, language, location, and rating
        genre = request.GET.get("genre")
        language = request.GET.get("language")
        location = request.GET.get("location")
        title = request.GET.get("title")
        rating = request.GET.get("rating")

        movies = Movie.objects.all()

        if title:
            movies = movies.filter(title__icontains=title)

        if genre:
            movies = movies.filter(genre=genre)

        if language:
            movies = movies.filter(language=language)

        if location:
            # Apply location filtering logic here
            pass

        if rating:
            movies = movies.filter(rating=rating)
        movie_serialized = MovieSerializer(movies, many=True).data

        return JsonResponse(movie_serialized, status=200, safe=False)


class GenreList(APIView):
    def get(self, request, format=None):
        # Query unique genres from the Movie model
        unique_genres = Movie.objects.values_list("genre", flat=True).distinct()
        # Convert the QuerySet to a list
        genre_list = list(unique_genres)
        return JsonResponse(genre_list, status=status.HTTP_200_OK, safe=False)


class UniqueLanguagesAPI(APIView):
    def get(self, request):
        languages = Movie.objects.values_list("language", flat=True).distinct()
        language_list = list(languages)
        return JsonResponse(language_list, status=status.HTTP_200_OK, safe=False)


class SeatView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request):
        data = request.data
        print(data)
        serializer = SeatSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, id=None):
        try:
            seat = Seat.objects.get(id=id)
        except Seat.DoesNotExist:
            return Response(
                {"message": "seat not found"}, status=status.HTTP_404_NOT_FOUND
            )
        serializer = SeatSerializer(seat, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id=None):
        try:
            seat = Seat.objects.get(id=id)
            seat.delete()
            return Response({"message": "seat deleted"}, status=status.HTTP_200_OK)
        except Seat.DoesNotExist:
            return Response(
                {"message": "seat not found"}, status=status.HTTP_404_NOT_FOUND
            )


class TheaterView(APIView):
    def get(self, request, movie_id=None):
        print(request.data)
        if movie_id:
            try:
                movie = Movie.objects.get(id=movie_id)
                serializer = MovieSerializer(movie).data
                theaters = Theater.objects.filter(movie=movie_id).values()
                serializer["theaters"] = list(theaters)
                return Response(serializer, status=status.HTTP_200_OK)
            except Movie.DoesNotExist:
                return Response(
                    {"message": "theaters not found"}, status=status.HTTP_404_NOT_FOUND
                )
        theaters = Theater.objects.all()
        print(theaters)
        serializer = TheaterSerializer(theaters, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TheaterViewMD(APIView):
    def get(self, request, movie_id):
        print(request.data)
        try:
            movie = Movie.objects.get(id=movie_id)
            serializer = MovieSerializer(movie).data
            theaters = Theater.objects.filter(movie=movie_id).values()
            print(theaters)
            serializer["theaters"] = list(theaters)
            return Response(serializer, status=status.HTTP_200_OK)
        except Movie.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class TheaterSeats(APIView):
    def get(self, request, id):
        try:
            theater = Theater.objects.get(id=id)
            serializer = TheaterSerializer(theater).data
            seats = (
                Seat.objects.filter(theater=id)
                .order_by(
                    "seat_number",
                )
                .values("id", "seat_number", "is_reserved", "category", "price")
            )
            serializer["seats"] = list(seats)
            return Response(serializer, status=status.HTTP_200_OK)
        except Theater.DoesNotExist:
            return Response(
                {"message": "theaters not found"}, status=status.HTTP_404_NOT_FOUND
            )
        # hi code


class TheaterCreateView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def post(self, request, movie_id):
        print(request.data)
        try:
            movie = Movie.objects.get(id=movie_id)
            request.data["movie"] = movie_id
        except Movie.DoesNotExist:
            return Response(
                {"message": "Movie not found"}, status=status.HTTP_404_NOT_FOUND
            )
        serializer = TheaterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(movie=movie)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, theater_id):
        try:
            theater = Theater.objects.get(id=theater_id)
        except Theater.DoesNotExist:
            return Response(
                {"message": "Theater not found"}, status=status.HTTP_404_NOT_FOUND
            )

        theater.delete()
        return Response(
            {"message": "Theater deleted successfully"},
            status=status.HTTP_204_NO_CONTENT,
        )

    def put(self, request, theater_id):
        try:
            theater = Theater.objects.get(id=theater_id)
        except Theater.DoesNotExist:
            return Response(
                {"message": "Theater not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = TheaterSerializer(theater, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id=None):
        print(request.data)
        if id:
            try:
                booking = Booking.objects.get(user=request.user.id, id=id)
                serializer = BookingDetailsSerializer(booking).data
                return Response(serializer, status=status.HTTP_200_OK)
            except:
                return Response(
                    {"message": "Booking not found"}, status=status.HTTP_404_NOT_FOUND
                )
        booking = Booking.objects.filter(user=request.user.id)
        serializer = BookingDetailsSerializer(booking, many=True).data
        return Response(serializer, status=status.HTTP_200_OK)

    def post(self, request, id=None):
        print(request.data)
        seats = request.data.get("seats", [])
        allSeats = Seat.objects.filter(id__in=seats)
        is_reserved = allSeats.filter(is_reserved__in=[True])
        if is_reserved:
            return Response(
                {"message": "seats already book"}, status=status.HTTP_400_BAD_REQUEST
            )
        data = request.data
        data["user"] = request.user.id
        total_price = allSeats.aggregate(sum=Sum("price"))
        data["total_cost"] = total_price["sum"]
        serializer = BookingSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            Seat.objects.filter(id__in=seats).update(is_reserved=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            # booking=Booking.objects.get(id=id,user=request.user.id)
            booking = Booking.objects.get(id=id)
            unreserved = booking.seats.values_list("id", flat=True)
            Seat.objects.filter(id__in=list(unreserved)).update(is_reserved=False)
            booking.delete()
            return Response({"message": "booking canceled"}, status=status.HTTP_200_OK)
        except:
            return Response(
                {"message": "booking not avilable"}, status=status.HTTP_404_NOT_FOUND
            )


class BookingViewAdmin(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        page_number = request.GET.get("page", 1)
        booking = Booking.objects.all().order_by("id")
        paginator = Paginator(booking, 2)
        page = paginator.get_page(page_number)
        tickets_on_page = page.object_list
        tickets_serialized = BookingDetailsSerializer(tickets_on_page, many=True).data
        return JsonResponse(
            {
                "results": tickets_serialized,
                "num_pages": paginator.num_pages,
                "total_user": booking.count(),
            }
        )
