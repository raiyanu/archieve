from tkinter import *
from PIL import *
from tkinter import messagebox
from PIL import ImageTk,Image
#showinfo, showwarning, showerror, askquestion(will send yes or no)
#askookcancel(will send true or false ,,, 1 or 2),askyesno(will send true or false ,,, 1 or 2)
ray = Tk()
label = Label(ray, text="heloo this is a askokcancel version ")
label.pack()
#a1 = Entry(ray,width=40,borderwidth=5)
#a1.pack()
def click():
	respond=messagebox.askokcancel("dumb", "bruh are you stupid")
	if respond==1:
		d = Label(ray, text="lol why!")
		d.pack()
		print(respond)
	label1 = Label(ray, text="for askokcancel_response: "+respond)
	label1.pack()

butt = Button(ray,text="showokcancel",command=click)
butt.pack()
#------------------------------------------------------------------------------------
exert = Label(ray, text="=====================================================================================")
exert.pack()
lab = Label(ray, text="heloo this is a warning version")
lab.pack()
#a1 = Entry(ray,width=40,borderwidth=5)
#a1.pack()
def click():
	respond=messagebox.showwarning("dumb", "bruh are you stupid")
	label1 = Label(ray, text="showwarning_response: "+respond)
	label1.pack()

butt = Button(ray,text="showwarning",command=click)
butt.pack()
#------------------------------------------------------------------------------------
exe = Label(ray, text="=====================================================================================")
exe.pack()
lab1 = Label(ray, text="heloo this is a info version")
lab1.pack()
#a1 = Entry(ray,width=40,borderwidth=5)
#a1.pack()
def click():
	respond=messagebox.showinfo("dumb", "bruh are you stupid")
	label1 = Label(ray, text="showinfo_respond :  "+respond)
	label1.pack()

butt = Button(ray,text="showinfo",command=click)
butt.pack()
#------------------------------------------------------------------------------------
exert = Label(ray, text="=====================================================================================")
exert.pack()
lab = Label(ray, text="heloo this is a error version")
lab.pack()
#a1 = Entry(ray,width=40,borderwidth=5)
#a1.pack()
def click():
	respond=messagebox.showerror("dumb", "bruh are you stupid")
	label1 = Label(ray, text="showerror_response :  "+respond)
	label1.pack()

butt = Button(ray,text="showwerror",command=click)
butt.pack()
#------------------------------------------------------------------------------------
exer = Label(ray, text="=====================================================================================")
exer.pack()
labe = Label(ray, text="heloo this is a error version")
labe.pack()
#a1 = Entry(ray,width=40,borderwidth=5)
#a1.pack()
def click():
	respond=messagebox.showyesno("dumb", "bruh are you stupid")
	label1 = Label(ray, text="showerror_response :  "+respond)
	label1.pack()

butt = Button(ray,text="showwerror",command=click)
butt.pack()
mainloop()