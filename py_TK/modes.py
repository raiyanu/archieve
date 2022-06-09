from tkinter import*
ray = Tk()
ray.title("ray")
ray.geometry("400x450")




foods = [
	("burger","unhealthy","0","0"),
	("noodles","healthy","1","0"),
	("chicken fry ","unhealthy","2","0"),
	("curry","healthy","3","0"),
	("chocolate","healthy","4","0"),
	("biscuits","healthy","5","0"),
	("fruits","healthy","6","0"),
	("sugar","unhealthy","7","0"),
	("french fries","unhealthy","8","0"),
	("chips","unhealthy","9","0"),
	("grapes","healthy","10","0"),
	("carrots","healthy","11","0"),
	("wine","unhealthy","12","0")
]



for dosh,check,ro,co in foods():
	dosh = Label(frame)
	Radiobutton(frames,text=dosh,variable=str(dosh),value=1).grid(row=r,column=c)
mainloop()