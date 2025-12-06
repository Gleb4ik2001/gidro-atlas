from django.db import models

from datetime import date
import uuid


class WaterObject(models.Model):
    RESOURCE_CHOICES = (
        ('lake', 'Озеро'),
        ('canal', 'Канал'),
        ('reservoir', 'Водохранилище'),
    )

    WATER_TYPE = (
        ('fresh', 'Пресная'),
        ('nonfresh', 'Непресная'),
    )

    id = models.UUIDField(verbose_name='айди', primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(verbose_name='название', max_length=255)
    region = models.CharField(verbose_name='регион', max_length=255)

    resource_type = models.CharField(verbose_name='тип водоёма', max_length=20, choices=RESOURCE_CHOICES)
    water_type = models.CharField(verbose_name='пресная/непресная', max_length=20, choices=WATER_TYPE)

    fauna = models.BooleanField(verbose_name='наличие фауны', default=False)
    passport_date = models.DateField(verbose_name='дата паспорта', null=True, blank=True)
    technical_condition = models.PositiveSmallIntegerField(verbose_name='техническое состояние', default=1)

    latitude = models.FloatField(verbose_name='широта')
    longitude = models.FloatField(verbose_name='долгота')

    pdf = models.FileField(verbose_name='пдф файл', upload_to="passports/", null=True, blank=True)
    priority = models.IntegerField(verbose_name='уровень приоритета',null=True, blank=True)

    def calculate_priority(self):
        age_years = 0
        if self.passport_date:
            age_years = (date.today() - self.passport_date).days // 365

        return (6 - self.technical_condition) * 3 + age_years

    def save(self, *args, **kwargs):
        self.priority = self.calculate_priority()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'водный ресурс'
        verbose_name_plural = 'водные ресурсы'
        ordering = ('-id',)
