from tkinter import*
ray = Tk()
ray.title("ray")
ray.geometry("400x450")
#fcuntion 
def clicked(option):
	if (option==1):
		label= Label(frame,text="you are right!!!",font=40).pack()
	if (option==2):
		label= Label(frame,text="you are wrong!!!",font=40).pack()


#creating a frame inside ray tab
frame = LabelFrame(ray,text="define healthy and unhealthy food...",padx=100,pady=70,bd=2,font=15,relief=SUNKEN)
frame.grid(row=1,column=0)
box = LabelFrame(ray, text="tick carefully", padx=200,pady=250)
# question label 
qu =Label(frame,text="life is ______?...",font = 30).grid(row=0,column=0)
zar = IntVar()
zar.set("2")
"""
							unhealthy = 1
							healthy = 2



"""
foods = [
	("burger","unhealthy",1),
	("noodles","healthy",2),
	("chicken fry ","unhealthy",1),
	("curry","healthy",2,),
	("chocolate","healthy",2),
	("biscuits","healthy",2),
	("fruits","healthy",2),
	("sugar","unhealthy",1),
	("french fries","unhealthy",1),
	("chips","unhealthy",1),
	("grapes","healthy",2),
	("carrots","healthy",2),
	("wine","unhealthy",1),
	]
c=0
r=0
for dish,check,k in foods:
	dish = Label(frame,text=dish,font=7)
	dish.grid(row=c,column=r)
	c= c+1
	if (r==0):
		r=r+1
	if (r==1):
		r=r-1
	Radiobutton(frame,text=dish,variable=dish,value=k).grid(row=r,column=c)
for dish,check,k in foods:
	
	dish = IntVar()
	dish.set(check)
#Radiobutton(frame,text="fucking race",variable=zar,value="1",command=lambda:clicked(1),font =20).pack(anchor=W)
#Radiobutton(frame,text="beautiful",variable=zar,value="2",command=lambda:clicked(2),font = 20).pack(anchor=W)

mainloop()