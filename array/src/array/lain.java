package array;

public class lain {
	public static void main(String[] args) {
		System.out.println("--= welcome =--");
		String[] arr = {"life","is", "cute"};
		System.out.println(arr.length);
		for (int i = 0; i < arr.length; i++) {
			if (i==(arr.length-1)) {
				System.out.print(arr[i]);	
			} else {
				
				System.out.print(arr[i]+"-");	
			}
		}
		StringBuilder string = new StringBuilder(",");
		for (int i = 0; i < arr.length; i++) {
			 string.append(i+arr[i]+",");
		}
	}
}
