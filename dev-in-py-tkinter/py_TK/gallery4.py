from tkinter import*
from PIL import ImageTk,Image
import time
ray = Tk()
ray.geometry("250x400")
root = Tk()
root.iconbitmap('icony1.ico')
root.geometry("400x550")
canvas= Canvas(ray, width= 740, height= 390)
intro = Label(root,text="GALLERY",font=30).grid(row=0,column=0,columnspan=3)
#frm = Frame(root,width=100,height=200).grid(row=3,column=0)
picnum = 2
fr = Frame(ray)
def forward():
	global picnum
	global pict
	global pic
	global canvas
	print(picnum)
	if (picnum < 12):
		picnum = int(picnum) + 1
	canvas.grid_forget()
	pic = ImageTk.PhotoImage(Image.open("pics/img("+str(picnum)+").jpg"))
	#pic= (Image.open("pics/img("+str(picnum)+").jpg"))
	lab = Label(text=pic)
	print(lab)
	resized_image= pic.resize((720,380), Image.ANTIALIAS)
	pif= ImageTk.PhotoImage(resized_image)
	canvas= Canvas(ray, width= 740, height= 390)
	canvas.grid(row=0,column=0,columnspan=3)
	canvas.create_image(10,10, anchor=NW, image=pif)
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
	global canvas
	print(picnum)
	canvas.grid_forget()
	if (picnum > 0):
		picnum = int(picnum) - 1
	pic= (Image.open("pics/img("+str(picnum)+").jpg"))
	lab = Label(text=pic)
	print(lab)
	resized_image= pic.resize((720,380), Image.ANTIALIAS)
	pif= ImageTk.PhotoImage(resized_image)
	canvas= Canvas(ray, width= 740, height= 390)
	canvas.grid(row=0,column=0,columnspan=3)
	canvas.create_image(10,10, anchor=NW, image=pif)
	buttonb = Button(root,text="<---",command=backward)
	buttonb.grid(row=1,column=0)
	buttonq = Button(root,text="exit!",command=root.quit)
	buttonq.grid(row=1,column=1)
	buttonf = Button(root,text="--->",command=forward)
	buttonf.grid(row=1,column=2)
#====================================================================================
pic= (Image.open("pics/"+"alice"+".jpg"))
lab = Label(text=pic)
print(lab)
resized_image= pic.resize((720,380), Image.ANTIALIAS)
pif= ImageTk.PhotoImage(resized_image)
canvas= Canvas(ray, width= 740, height= 390)
canvas.grid(row=0,column=0,columnspan=3)
canvas.create_image(10,10, anchor=NW, image=pif)
buttonb = Button(root,text="<---",command=backward)
buttonb.grid(row=1,column=0)
buttonq = Button(root,text="exit!",command=root.quit)
buttonq.grid(row=1,column=1)
buttonf = Button(root,text="--->",command=forward)
buttonf.grid(row=1,column=2)
mainloop()