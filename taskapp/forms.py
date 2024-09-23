from django import forms  # Import the Django forms module
from .models import Task  # Import the Task model from the current app's models file

class TaskForm(forms.ModelForm):  # Define a class named TaskForm that inherits from forms.ModelForm
    title = forms.CharField(  # Declare a CharField for the title
        widget=forms.TextInput(  # Specify the widget to use for the title field
            attrs={"class": "myinput", "placeholder": "Enter Todo"}  # Set HTML attributes for the widget
        )
    )
    
    class Meta:  # Define an inner Meta class for metadata
        model = Task  # Specify that the form is based on the Task model
        fields = ["title"]  # Include only the title field in the form
