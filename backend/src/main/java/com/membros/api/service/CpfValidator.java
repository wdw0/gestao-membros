package com.membros.api.service;

public class CpfValidator {

    private CpfValidator() {}

    public static boolean isValid(String cpf) {
        String digits = cpf.replaceAll("\\D", "");

        if (digits.length() != 11) return false;
        if (digits.chars().distinct().count() == 1) return false;

        int sum = 0;
        for (int i = 0; i < 9; i++) {
            sum += Character.getNumericValue(digits.charAt(i)) * (10 - i);
        }
        int first = 11 - (sum % 11);
        if (first >= 10) first = 0;

        sum = 0;
        for (int i = 0; i < 10; i++) {
            sum += Character.getNumericValue(digits.charAt(i)) * (11 - i);
        }
        int second = 11 - (sum % 11);
        if (second >= 10) second = 0;

        return first == Character.getNumericValue(digits.charAt(9))
                && second == Character.getNumericValue(digits.charAt(10));
    }

    public static String onlyDigits(String cpf) {
        return cpf.replaceAll("\\D", "");
    }
}
