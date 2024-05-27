from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serilizers import NoteSerilizer
# Create your views here.

@api_view(["GET"])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },]

    return Response(routes)


@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all()
    serilizers = NoteSerilizer(notes, many=True)

    return Response(serilizers.data)



@api_view(['GET'])
def getNote(request, pk):

    note = Note.objects.get(id=pk)
    serilizer = NoteSerilizer(note, many=False)

    return Response(serilizer.data)


@api_view(['PUT'])
def updateNote(request, pk):
    note = Note.objects.get(id=pk)
    data = request.data
    serilisers = NoteSerilizer(instance=note, data=data)

    if serilisers.is_valid():
        serilisers.save()



    return Response(serilisers.data)


@api_view(['DELETE'])
def deleteNote(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()



    return Response("note was deleted")


@api_view(["POST"])
def createNote(request):

    data = request.data
    note = Note.objects.create(body=data['body'])

    serilizers = NoteSerilizer(note, manay=False)



    return Response(serilizers.data)