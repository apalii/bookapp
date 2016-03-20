from django import forms
from app_book.models import Book


class BookEditForm(forms.ModelForm):

    class Meta:
        model = Book
        fields = [
            'name', 'description', 'pages', 'author', 'published', 'img'
            ]