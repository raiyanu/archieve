from tkinter import*
ray= Tk()
def show():
	global label
	label.forget()
	label=Label(ray,text="the box is currently	:"+value.get())
	label.pack()
value =StringVar()
checkbox =Checkbutton(ray,text="your answer is",variable=value,onvalue="YES",offvalue="NO")
checkbox.deselect()
checkbox.pack()
label=Label(ray,text="the box is currently	:"+value.get())
button = Button(ray,text="find box state",command=show).pack()
butten = Button(ray,text="box",font=20)
mainloop()