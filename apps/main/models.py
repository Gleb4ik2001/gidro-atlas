from django.db import models

from datetime import date
import uuid


class RegionChoices(models.TextChoices):
    AKMOLA = "akmola", "Акмолинская"
    AKTOBE = "aktobe", "Актюбинская"
    ALMATY_REGION = "almaty_region", "Алматинская"
    ATYRAU = "atyrau", "Атырауская"
    EAST_KZ = "east_kz", "Восточно-Казахстанская"
    ZHAMBYL = "zhambyl", "Жамбылская"
    WEST_KZ = "west_kz", "Западно-Казахстанская"
    KARAGANDA = "karaganda", "Карагандинская"
    KOSTANAY = "kostanay", "Костанайская"
    KYZYLORDA = "kyzylorda", "Кызылординская"
    MANGYSTAU = "mangystau", "Мангистауская"
    PAVLODAR = "pavlodar", "Павлодарская"
    NORTH_KZ = "north_kz", "Северо-Казахстанская"
    TURKESTAN = "turkestan", "Туркестанская"
    ULYTAU = "ulytau", "Улытауская"
    ZHETYSU = "zhetysu", "Жетысуская"
    ASTANA = "astana", "г. Астана"
    ALMATY = "almaty", "г. Алматы"
    SHYMKENT = "shymkent", "г. Шымкент"


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
    region = models.CharField(verbose_name='регион', max_length=50, choices=RegionChoices.choices)

    resource_type = models.CharField(verbose_name='тип водоёма', max_length=20, choices=RESOURCE_CHOICES)
    water_type = models.CharField(verbose_name='пресная/непресная', max_length=20, choices=WATER_TYPE)

    fauna = models.BooleanField(verbose_name='наличие фауны', default=False)
    passport_date = models.DateField(verbose_name='дата паспорта', null=True, blank=True)
    technical_condition = models.PositiveSmallIntegerField(verbose_name='техническое состояние', null=True, blank=True)

    latitude = models.FloatField(verbose_name='широта')
    longitude = models.FloatField(verbose_name='долгота')

    pdf = models.FileField(verbose_name='пдф файл', upload_to="passports/", null=True, blank=True)
    priority = models.IntegerField(verbose_name='уровень приоритета',null=True, blank=True)


    def get_age_years(self):
        if self.passport_date:
            return (date.today() - self.passport_date).days // 365
        return 0

    def calculate_priority(self):
        age_years = self.get_age_years(); 
        return (6 - self.technical_condition) * 3 + age_years

    def calculate_technical_condition(self):
        score = 5
        age = self.get_age_years()
        if age > 30:
            score -= 2
        elif age > 15:
            score -= 1
        if self.fauna:
            score -= 1
        if self.water_type == "nonfresh":
            score -= 1
        if self.resource_type == "canal":
            score -= 1
        return max(1, min(5, score))

    def save(self, *args, **kwargs):
        self.technical_condition = self.calculate_technical_condition()
        self.priority = self.calculate_priority()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'водный ресурс'
        verbose_name_plural = 'водные ресурсы'
        ordering = ('-id',)
