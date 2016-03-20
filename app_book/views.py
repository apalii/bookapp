from django.http import HttpResponse, Http404, JsonResponse
from django.views.generic import TemplateView,ListView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.core.urlresolvers import reverse_lazy

from app_book.models import Book, Author
from app_book.forms import BookEditForm


def latestbook(request):
    last_book = Book.objects.order_by('added').values()[0]
    return JsonResponse(last_book, safe=False)

class BookList(ListView):
    model = Book
    template_name = 'main.html'
    context_object_name = 'books'
    paginate_by = 5


class AuthorList(ListView):
    model = Author
    template_name = 'authors.html'
    context_object_name = 'authors'


class BookUpdate(UpdateView):
    model = Book
    template_name = 'book_edit.html'
    success_url = reverse_lazy('book_list')
    fields = [
        'name', 'description', 'pages', 'author', 'published', 'img'
        ]


class BookAdd(CreateView):
    model = Book
    template_name = 'book_edit.html'
    success_url = reverse_lazy('book_list')
    fields = [
        'name', 'description', 'pages', 'author', 'published', 'img'
        ]