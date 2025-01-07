from django import forms  # Import the Django forms module
from api.models import Task  # Import the Task model from the current app's models file
from django.utils.translation import gettext_lazy as _
from .models import CustomUser


class TaskForm(forms.ModelForm):  # Define a class named TaskForm that inherits from forms.ModelForm
    title = forms.CharField(  # Declare a CharField for the title
        widget=forms.TextInput(  # Specify the widget to use for the title field
            attrs={"class": "myinput", "placeholder": _("Enter Todo")}  # Set HTML attributes for the widget
        )
    )
    
    class Meta:  # Define an inner Meta class for metadata
        model = Task  # Specify that the form is based on the Task model
        fields = ["title", "completed"]  # Include only the title field in the form


class AdditionalUserInfo(forms.ModelForm):
    job = forms.CharField(
        max_length=100,
        widget= forms.TextInput(
            attrs={"class": "job", "placeholder": _("Enter your profession")}
        )
    )
    phone_number = forms.CharField(
        widget = forms.TextInput(
            attrs={"class": "phone_number", "placeholder": _("Phone number")}
        )
    )


    class Meta:
        model = CustomUser
        fields = ['job', 'phone_number']