from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from .models import Item, ShoppingList
from .serializers import ItemSerializer, ShoppingListSerializer, UserSerializer
from rest_framework.response import Response
from django.db.models import Q
from bs4 import BeautifulSoup
import requests
from rest_framework.permissions import IsAuthenticated

class ShoppingListView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ItemSerializer
    def get_queryset(self):
            return Item.objects.filter(Q(shopping_list=self.kwargs['pk']))
    
    def get(self, req, pk):
        query_list = ShoppingList.objects.get(id=self.kwargs['pk'])
        if query_list.owner == self.request.user:
            serialized = ItemSerializer(self.get_queryset(), many=True)
            return Response(serialized.data)
        return Response("Not Found", status=404)

class UserShoppingListView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ShoppingListSerializer
    def get_queryset(self):
        return ShoppingList.objects.filter(Q(owner=self.kwargs['pk']))
    
    def get(self, req, pk):
        if self.get_queryset():
            serialized = ShoppingListSerializer(self.get_queryset(), many=True)
            return Response(serialized.data)
        return Response("Not Found", status=404)

class ItemView(generics.RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    def get_queryset(self):
        return Item.objects.filter(shopping_list=self.kwargs['l_pk'])
    serializer_class = ItemSerializer

class UserView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class UserCreate(APIView):

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            print(user)
            return Response("Suc", status=201)
        return Response(serializer.errors, status=400)

class ItemNew(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ItemSerializer

class ShoppingListNew(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ShoppingListSerializer

class ItemDelete(generics.DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class ListDelete(generics.DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = ShoppingList.objects.all()
    serializer_class = ShoppingListSerializer

class ItemData(APIView):
    permission_classes = (IsAuthenticated,)
    def scrap(self, name):
        data = {}
        i = 0
        url = "https://www.metro.ca/en/online-grocery/search?filter=" + name
        page = requests.get(url)
        soup = BeautifulSoup(page.content, 'html.parser')
        price_tag = soup.find_all("div", class_="pt--prices")
        name = soup.find_all("div", class_="pt--title")
        brand = soup.find_all("span", class_="pt--brand")
        for price in price_tag:
            price_line = price.find("div", class_="pi--prices--first-line")
            prime_price = price_line.find("span", class_="pi--price")
            secondary_price = price_line.find("div", class_="pi--secondary-price")
            data[brand[i].text+":"+name[i].text] = prime_price.text
            i+=1
            if i>=10:
                return data
        return data

    def get(self, req, name):
        return Response(self.scrap(name)) if self.scrap(name) else Response("Not Found", status=404)
    
