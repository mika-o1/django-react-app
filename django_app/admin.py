from django.contrib import admin
from django_app import models


admin.site.site_header = 'Панель управления приложением'
admin.site.index_title = 'Управление моделями'
admin.site.site_title = 'Панель управления'

class TextModelAdmin(admin.ModelAdmin):
    """
    Настройки отображения, фильтрации и поиска модели:'TextModel' на панели администратора
    """

    list_display = (  # поля для отображения
        'author',
        'text',
        'created_datetime',
    )
    list_display_links = (  # поля-ссылка
        'author',
        'created_datetime',
    )
    list_editable = (  # поля для редактирования объекта на лету
        'text',
    )
    list_filter = (  # поля для редактирования объекта на лету
        'author',
        'text',
        'created_datetime',
    )
    fieldsets = (  # подзаголовки для визуального отделения блоков друг от друга
        ('Основное', {'fields': (
            'author',
            'text',
            'created_datetime',
        )}),
    )
    search_fields = [  # поле для поиска
        'author',
        'text',
        'created_datetime',
    ]


admin.site.register(models.TextModel, TextModelAdmin)
