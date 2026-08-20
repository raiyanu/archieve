package NearMe;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

public class file_checker {
	public void check_env(){
		//System.out.println("hello idiot");
		File uLIST = new File("user");
		if(!uLIST.exists()) {
			System.out.println(" file dont exits : uLIST");
			FileWriter write;
			try {
				write = new FileWriter(uLIST);
				write.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		} else {
			//System.out.println("oh baby! its there");
		}
		
	}

}
