from tkinter import*
ray= Tk()
z = 9
value =StringVar()
entries= Entry(ray)
entries.pack()
lists = [
	"chocolate",
	"biscuits",
	"applepie",
	"stawberry",
	"greenchilly",
	"wine",
	"cream",
	"pizza",
	"burger",
	"chocopie"
	]
def show():
	global label
	label.forget()
	checkbox =OptionMenu(ray,value,*lists)
	checkbox.pack()
	checkbox.forget()
	label=Label(ray,text="the box is currently	:"+value.get())
	label.pack()
	entries= Entry(ray)
	entries.pack()
	label=Label(ray,text="the box is currently	:"+value.get())
	button = Button(ray,text="find box state",command=show).pack()
def add(item):
	global list
	global z
	z=z+1
	lists.append(item)
	checkbox =OptionMenu(ray,value,*lists)
	global label
	label.forget()
	label=Label(ray,text="the box is currently	:"+value.get())
	label.pack()
	entries= Entry(ray)
	entries.pack()
	label=Label(ray,text="the box is currently	:"+value.get())
	button = Button(ray,text="find box state",command=show).pack()
	checkbox =OptionMenu(ray,value,*lists)
	checkbox.pack()
value.set(lists[0])
checkbox =OptionMenu(ray,value,*lists)
checkbox.pack()
label=Label(ray,text="the box is currently	:"+value.get())
button = Button(ray,text="find box state",command=show).pack()
button= Button(ray,text="ENTER",font=20,command=lambda:add(entries.get()))
button.pack()
mainloop()