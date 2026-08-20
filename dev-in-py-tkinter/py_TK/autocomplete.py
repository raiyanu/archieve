from tkinter import *

import messagebox
from ttkwidgets.autocomplete import AutocompleteCombobox
def open(texts):
    if (texts=="ray"):
        messagebox.showinfo("admin","nice to meet you")
countries = [
    'Antigua and Barbuda', 'Bahamas', 'Barbados', 'Belize', 'Canada',
    'Costa Rica ', 'Cuba', 'Dominica', 'Dominican Republic', 'El Salvador ',
    'Grenada', 'Guatemala ', 'Haiti', 'Honduras ', 'Jamaica', 'Mexico',
    'Nicaragua', 'Saint Kitts and Nevis', 'Panama ', 'Saint Lucia',
    'Saint Vincent and the Grenadines', 'Trinidad and Tobago', 'United States of America'
    'china','india','south africa','ray'



]

ws = Tk()
ws.title('PythonGuides')
ws.geometry('400x300')
ws.config(bg='#8DBF5A')

frame = Frame(ws, bg='#8DBF5A')
frame.pack(expand=True)

Label(
    frame,
    bg='#8DBF5A',
    font=('Times', 21),
    text='Countries in North America '
).pack()

entry = AutocompleteCombobox(
    frame,
    width=30,
    font=('Times', 18),
    completevalues=countries
)
entry.pack()
butt = Button(ws , text="check" , command=lambda:open(entry.get()))
butt.pack()
ws.mainloop()
