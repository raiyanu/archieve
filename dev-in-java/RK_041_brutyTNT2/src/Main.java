import java.io.FileWriter;
import java.io.IOException;
 
class Main{  
  public static void main(String args[]) throws IOException{  
    System.out.println("Hello Java");
    int num=1000;
    for(int i =0; i<=10000;i++){
    	if(i==num) {
    		System.out.println("we have done  : " + num);
    		num =num+ 1000;
    	}
    FileWriter filer = new FileWriter("sample.txt",true);
    filer.append("\n"+i);
    filer.close();
    }
    System.out.println("done!");
 }  
}