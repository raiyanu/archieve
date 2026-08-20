package for_chu;
import java.util.Scanner;

public class nain {

	public static void main(String[] args) {
		System.out.println("how many times do you wanna print hey huh?");
		Scanner scan = new Scanner(System.in);
		int times = scan.nextInt();
		scan.close();
		for (int i = 0; i <= times; i++) {
			System.out.println("hey :"+i);
		}
		System.out.println("hurray you exited the program, after printing "+times+" n umber of times");
	}

}
