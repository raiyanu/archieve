from tkinter import*
from PIL import ImageTk,Image
from tkinter import filedialog
ray = Tk()
ray.iconbitmap('icony1.ico')
root = LabelFrame(ray,text="frame size",padx=150,pady=180)
root.pack()
pict = Label(text="		To open file click below button and select file you desire		",font=20)
pict.pack(anchor=N)
lab = Label()
#-------------------------------------------
def open():	
	global pic
	global pict
	global lab
	pict.forget()
	lab.forget()
	file = filedialog.askopenfilename(initialdir="c:/code/py_tk",filetype=(("jpeg","*.jpg"),("all","*.*")))
	lab = Label(text=(file))
	lab.pack(anchor=N)
	#pic = ImageTk.PhotoImage(Image.open("pics/img(3).jpg"))
	#print(length(roy))
	pic = ImageTk.PhotoImage(Image.open(file))
	pict = Label(image=pic)
	pict.pack()
buten = Button(text="open pic",command=open).pack(anchor=S)
mainloop()