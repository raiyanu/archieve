import java.io.FileWriter;
import java.io.IOException;
 
class Main{  
  public static void main(String args[]) throws IOException{  
    System.out.println("Hello Java");  
    for(int i =0; i<=10000000;i++){
    FileWriter filer = new FileWriter("sample.txt",true);
    filer.append("\n"+i);
    filer.close();
    }
    System.out.println("done!");
 }  
}