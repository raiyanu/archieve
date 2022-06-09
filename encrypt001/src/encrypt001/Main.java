package encrypt001;
import java.util.Scanner;


	public class Main {

		public static void main(String[] args) {
			System.out.println("hello ");
			String[] key = {
					"a","A","b","c","C","d","D","e","E","f","F",
					"g","G","h","H","i","I","j","J","k","K","l",
					"L","m","M","o","O","p","P","q","Q","r","R",
					"s","S","t","T","u","U","v","V","w","W","x",
					"X","y","Y","z","Z","1","2","3","4","5","6",
					"7","8","9","0"
			};
			int  keyn = 0, letters = 0;
			Scanner scan = new Scanner(System.in);
			System.out.println("Enter a sentence : ");
			String sentence = scan.nextLine();
			System.out.println("key length : "+key.length);
			for (int i = 0; i < sentence.length(); i++) {
				int stopper;
				// a letter con's
				while (stopper==1) {
					for (int j = 0; j < key.length; j++) {
						if(sentence.charAt(i)==key[j]) {
							
						}
						keyn++;
					}	
				}
				System.out.println(sentence.charAt(i)+"="+ keyn + "=");
			}
			System.out.println("number of letters : "+letters);
			scan.close();

		}

}
