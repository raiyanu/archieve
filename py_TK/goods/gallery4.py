from tkinter import*
from PIL import ImageTk,Image
import time
ray = Tk()
ray.geometry("250x400")
root = Tk()
root.iconbitmap('icony1.ico')
root.geometry("250x400")
intro = Label(root,text="GALLERY",font=30).grid(row=0,column=0,columnspan=3)
#frm = Frame(root,width=100,height=200).grid(row=3,column=0)
picnum = 2
def forward():
	global picnum
	global pict
	global pic
	print(picnum)
	if (picnum < 12):
		picnum = int(picnum) + 1
	pict.grid_forget()
	pic = ImageTk.PhotoImage(Image.open("pics/img("+str(picnum)+").jpg"))
	pict = Label(image=pic)
	pict.grid(row=0,column=0,columnspan=3)
	print(picnum)
	buttonb = Button(root,text="<---",command=backward)
	buttonb.grid(row=1,column=0)
	buttonq = Button(root,text="exit!",command=root.quit)
	buttonq.grid(row=1,column=1)
	buttonf = Button(root,text="--->",command=forward)
	buttonf.grid(row=1,column=2)
def backward():
	global picnum
	global pict
	global pic
	print(picnum)
	pict.grid_forget()
	if (picnum > 0):
		picnum = int(picnum) - 1
	pic = ImageTk.PhotoImage(Image.open("pics/img("+str(picnum)+").jpg"))
	pict = Label(image=pic)
	pict.grid(row=0,column=0,columnspan=3)
	print(picnum)
	buttonb = Button(root,text="<---",command=backward)
	buttonb.grid(row=1,column=0)
	buttonq = Button(root,text="exit!",command=root.quit)
	buttonq.grid(row=1,column=1)
	buttonf = Button(root,text="--->",command=forward)
	buttonf.grid(row=1,column=2)
pic = ImageTk.PhotoImage(Image.open("pics/img("+str(picnum)+").jpg"))
pict = Label(image=pic)
pict.grid(row=0,column=0,columnspan=3)
buttonb = Button(root,text="<---",command=backward)
buttonb.grid(row=1,column=0)
buttonq = Button(root,text="exit!",command=root.quit)
buttonq.grid(row=1,column=1)
buttonf = Button(root,text="--->",command=forward)
buttonf.grid(row=1,column=2)
mainloop()