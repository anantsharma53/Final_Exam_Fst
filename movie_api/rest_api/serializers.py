from rest_framework import serializers
from .models import *
from django.contrib.auth import authenticate
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields="__all__"
    def create(self,validated_data):
        user=User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            name=validated_data['name'],
            # last_name=validated_data['last_name'],
            email=validated_data['email'],
            mobile_number=validated_data['mobile_number'],           
        )
        return user
class LoginSerializer(serializers.Serializer):
    username=serializers.CharField()
    password=serializers.CharField()
    def validate(self,data):
        user=authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Cred")
        
class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'

class TheaterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theater
        fields = '__all__'


class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat
        fields = '__all__'
# hi code

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
        extra_kwargs = {
            "seat":{"write_only": True},
            "user":{"write_only":True},
            "movie":{"write_only":True},
        }
class BookingDetailsSerializer(serializers.ModelSerializer):
    movie=MovieSerializer()
    seats=SeatSerializer(many=True)
    class Meta:
        model=Booking
        fields='__all__'
        