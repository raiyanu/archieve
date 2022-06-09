from tkinter import *
from PIL import *
from tkinter import messagebox
from PIL import ImageTk,Image

ray = Tk()
label = Label(ray, text="enter \"hey\" to continue")
label.pack()
frame =Frame(ray)
frame.pack()
c= 1
#showinfo, showwarning, showerror, askquestion,askookcancek,askyesno
def pop():
	global c
	global damn
	damn = str(a1.get())
	a1.delete(0,END)	
	if (damn == "hey"):
		global label
		if(c==1):
			label.forget()
			messagebox.showerror("baaaaaka ","are you stupid will you LoL.... will you do anything whatever is written above...?")
			label = Label(frame, text="okey now do it, again!")
			label.pack()
		if (c==2):
			label.forget()
			label = Label(frame, text="bruh "+str(c)+"rd time bruh???, are you seriously wanna do it again??")
			label.pack()
			messagebox.showerror("baaaaaka ","oh hell you did it again")
		if (c==3):
			label.forget()
			label = Label(frame, text="bruh "+str(c)+"rd time bruh???, are you seriously wanna do it again??")
			label.pack()
			messagebox.showerror("baaaaaka ","oh hell you did it again")
		if (c>3):
			label.forget()
			label = Label(frame, text="bruh bruh bruh its almost "+str(c)+"th times doing are you really crazy???")
			label.pack()
			messagebox.showerror("baaaaaka","hope good bless you some sense")
		c=c+1
	else:
		messagebox.showerror("dumb ass", ("bruh are you stupid \n do whatever said above"+"lol"))

a1 = Entry(ray,width=40,borderwidth=5,)
a1.pack()
butt = Button(ray,text="dont click me",command=pop)
butt.pack()
mainloop()