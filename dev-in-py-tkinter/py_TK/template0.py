from tkinter import*
from PIL import ImageTk,Image
from tkinter import filedialog
ray = Tk()
ray.iconbitmap('icony1.ico')
root = LabelFrame(ray,text="frame size",padx=150,pady=180)
root.pack()
#-------------------------------------------






roy = filedialog.askopenfilename(initialdir="c:/code/py_tk")
#pic = ImageTk.PhotoImage(Image.open("pics/img(3).jpg"))
pic = ImageTk.PhotoImage(Image.open(roy))
pict = Label(image=pic)
pict.pack()

mainloop()