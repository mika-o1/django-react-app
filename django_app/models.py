from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone


class TextModel(models.Model):
    author = models.ForeignKey(
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=None,
        verbose_name='Автор',
        help_text='<small class="text-muted">Автор</small><hr><br>',

        to=User,
        on_delete=models.CASCADE
    )
    text = models.CharField(
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default="",
        verbose_name="текст сообщения:",
        help_text='<small class="text-muted">это наше сообщение</small><hr><br>',

        max_length=500,
    )
    created_datetime = models.DateTimeField(
        primary_key=False,
        unique=False,
        editable=True,
        blank=True,
        null=True,
        default=timezone.now,
        verbose_name="время создания:",
        help_text='<small class="text-muted">время создания</small><hr><br>',

        auto_now_add=False,
        auto_now=False,
    )

    class Meta:
        app_label = 'django_app'
        ordering = ('text',)
        verbose_name = 'Сообщение'
        verbose_name_plural = 'Сообщения'

    def __str__(self):  # возвращает строкове представление объекта
        return f'{self.text[0:30:1]}'
