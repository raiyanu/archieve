from tkinter import *
from tkinter import messagebox
root = Tk()
root.title("ray's calculator")
myfield = Entry(root)
myfield.grid(padx=50,row=0,column=0,columnspan=3)
def pop(check):
	if (check =="error- no input"):
		messagebox.showerror("are you stupid?","are you really stupid bruh???? \n\n it's a error bruh \n\n make sure to enter some number")
	else:
		messagebox.showerror("dumb ass", ("bruh are you stupid"+"lol"))
ray = Frame(root).grid(row=2,column=0)
math = "life"
def myclick(number):
	tempo = box.get()
	box.delete(0,END)
	box.insert(0,str(tempo)+str(number))
def myclear():
	box.delete(0,END)
	return
def myadditons():
	global num1
	global math
	math = "add"
	num1 = int(box.get())
	box.delete(0,END)
	return
def mydiv():
	global num1
	global math
	math = "div"
	num1 = int(box.get())
	box.delete(0,END)
	return
def mymulti():
	global num1
	global math
	math = "multi"
	num1 = int(box.get())
	box.delete(0,END)
	return
def mysub():
	global num1
	global math
	math = "sub"
	num1 = int(box.get())
	box.delete(0,END)
	return
def myequal():
	num2=box.get()
	if math == "add":
		box.delete(0,END)
		box.insert(0, int(num1) + int(num2))
	if math == "multi":
		box.delete(0,END)
		box.insert(0,int(num1) * int(num2))
	if math == "sub":
		box.delete(0,END)
		box.insert(0,int(num1) - int(num2))
	if math == "div":
		box.delete(0,END)
		box.insert(0,int(num1) / int(num2))
		box.delete(0,END)
	
#making widgets (generation)
box = Entry(root,width=40,borderwidth=5)
mynum_1 = Button(ray, text=" 1 ",padx=35,pady=10,command=lambda:myclick(1))
mynum_2 = Button(ray, text=" 2 ",padx=35,pady=10,command=lambda:myclick(2))
mynum_3 = Button(ray, text=" 3 ",padx=35,pady=10,command=lambda:myclick(3))
mynum_4 = Button(ray, text=" 4 ",padx=35,pady=10,command=lambda:myclick(4))
mynum_5 = Button(ray, text=" 5 ",padx=35,pady=10,command=lambda:myclick(5))
mynum_6 = Button(ray, text=" 6 ",padx=35,pady=10,command=lambda:myclick(6))
mynum_7 = Button(ray, text=" 7 ",padx=35,pady=10,command=lambda:myclick(7))
mynum_8 = Button(ray, text=" 8 ",padx=35,pady=10,command=lambda:myclick(8))
mynum_9 = Button(ray, text=" 9 ",padx=35,pady=10,command=lambda:myclick(9))
mynum_0 = Button(ray, text=" 0 ",padx=35,pady=10,command=lambda:myclick(0))
myclear = Button(ray, text="<-",padx=35,pady=10,command=myclear)
myadd = Button(root, text="+",padx=35,pady=10,command=myadditons)
mymulti = Button(root, text="X",padx=35,pady=10,command=mymulti)
mysub = Button(root, text="-",padx=35,pady=10,command=mysub)
mydiv = Button(root, text="/",padx=35,pady=10,command=mydiv)
myequal = Button(root,text="=",padx=82,pady=10,command=myequal)
#showing widgets to display out (output)
mymulti.grid(row=7,column=2)
mysub.grid(row=7,column=1)
mydiv.grid(row=7,column=0)
myequal.grid(row=6,column=0,columnspan=2)
myadd.grid(row=5,column=2)
myclear.grid(row=5,column=1)
mynum_1.grid(row=4,column=0)
mynum_2.grid(row=4,column=1)
mynum_3.grid(row=4,column=2)
mynum_4.grid(row=3,column=0)
mynum_5.grid(row=3,column=1)
mynum_6.grid(row=3,column=2)
mynum_7.grid(row=2,column=0)
mynum_8.grid(row=2,column=1)
mynum_9.grid(row=2,column=2)
mynum_0.grid(row=5,column=0)
box.grid(row=0,column=0,columnspan=3)

#exit button
exiter= Button(root,text="exit",command=root.quit).grid(row=8,column=0,columnspan=3)
#end looper
root.mainloop()
