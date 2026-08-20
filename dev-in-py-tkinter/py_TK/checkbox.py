from tkinter import*
from PIL import ImageTk,Image
from tkinter import filedialog
ray = Tk()
ray.iconbitmap('icony1.ico')
root = LabelFrame(ray,text="frame size",padx=150,pady=180)
root.pack()
num = 1
roy="pics/alice.jpg"
print(roy)
label = Label(text="please enter how many times you wanna make buttton")
pic = ImageTk.PhotoImage(Image.open(roy))
pict = Label(image=pic,width=30)
box = Entry()
box.pack()
#--------------------------------------------------------------------------------------------------------------
def open(value):
	global box
	value=IntVar(value)
	box.forget()
	if(value<=10):
		for i in range(1,value):
			numm = str("love"+str(value))
			numm=Button(ray,text="open",command=lambda:open(box.get()))
			numm.pack()
	else:
		elabel=Label(text="sorry must be below or equal to 10")
	box = Entry()
	box.pack()

	global yes1
	global yes2
	global num
	global pic
	global pict
	global buten
	pict.forget()
	num = num+1
	print(num)
	buten.forget()
	buten=Button(ray,text="open",command=lambda:open(box.get()))
	buten.pack()
	roy = filedialog.askopenfilename(initialdir="c:/code/py_tk")
	print(roy)
	pic = ImageTk.PhotoImage(Image.open(roy))
	pict = Label(image=pic)
	pict.pack()
#pic = ImageTk.PhotoImage(Image.open("pics/img(3).jpg"))
buten=Button(ray,text="open",command=lambda:open(box.get()))
buten.pack()
mainloop()