from django.db import models
from django.core.urlresolvers import reverse
from django.utils import timezone

class Author(models.Model):
    name = models.CharField(max_length=60)
    last_name = models.CharField(max_length=60)
    bio = models.TextField(max_length=1000, default="About the author")

    def __str__(self):
        return "{} - {}".format(self.name, self.last_name)

    class Meta():
        db_table = "author"


class Book(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(max_length=1000,  default="About the book")
    rate = models.FloatField(default=0)
    img = models.FileField(upload_to='%Y/%m/%d')
    published = models.DateField(null=True, blank=True)
    pages = models.PositiveIntegerField(null=True, blank=True)
    added = models.DateTimeField(db_index=True, auto_now_add=True)
    author = models.ForeignKey(Author, null=True, blank=True, on_delete=models.SET_NULL)

    class Meta():
        db_table = "book"

    def __str__(self):
        if not self.author:
            return "Unkown author - {}".format(self.name)
        return "{} - {}".format(self.author, self.name)

    def get_absolute_url(self):
        return reverse('book_edit', kwargs={'pk': self.pk})