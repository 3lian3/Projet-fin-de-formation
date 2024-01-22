import { AbstractControl, ValidatorFn } from '@angular/forms';

export function NumberLengthValidator(length: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const value = control.value;

    // Vérifie si la valeur est présente
    if (value === null || value === undefined || value === '') {
      return null; // Pas de validation si la valeur est vide
    }

    // Vérifie si la valeur est un nombre (y compris le 0 au début)
    const isNumeric = /^\d+$/.test(value);

    // Vérifie la longueur de la valeur
    const validLength = isNumeric && value.toString().length === length;

    // Retourne une erreur si la longueur n'est pas valide
    return validLength ? null : { lengthVerify: true };
  };
}

export function SocialSecurityNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const value = control.value;

    // Vérifie si la valeur est présente
    if (value === null || value === undefined || value === '') {
      return null; // Pas de validation si la valeur est vide
    }

    // Regex pour le standart d'un numéro de sécurité social
    const socialSecurityNumberRegex =
      /^[12][0-9]{2}(0[1-9]|1[0-2])(2[AB]|[0-9]{2})[0-9]{3}[0-9]{3}([0-9]{2})$/;

    // Vérifie si la valeur correspond à la regex
    const isValid = socialSecurityNumberRegex.test(value);

    // Retourne une erreur si la valeur n'est pas valide
    return isValid ? null : { SocialSecurityNumberInvalid: true };
  };
}

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const value = control.value;

    // Vérifie si la valeur est vide
    if (value === null || value === undefined || value === '') {
      return null; // Retourne null si la valeur est vide
    }

    // Regex pour les numéros commençant par 0 et suivis de 9 chiffres (portable et fixe)
    const phoneNumberRegex = /^0[1-9]\d{8}$/;

    // Vérifie si la valeur correspond à la regex
    const isValid = phoneNumberRegex.test(value);

    // Retourne une erreur si la valeur n'est pas valide
    return isValid ? null : { phoneNumberInvalid: true };
  };
}

export function lettersOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const value = control.value as string;

    // Vérifie si je champs est vide
    if (!value) {
      return null; // Si vide pas de vérification
    }

    // Regex pour vérifier si la valeur contient uniquement des lettres et le caractère '-'
    const valid =
      /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ._-\s]+$/.test(
        value,
      );

    return valid ? null : { lettersOnly: true };
  };
}

export function allowedCharactersValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const value = control.value as string;

    // Vérifie si je champs est vide
    if (!value) {
      return null; // Si vide pas de vérification
    }

    // Regex pour vérifier si la valeur contient uniquement des lettres et le caractère '-'
    const valid = /^[A-Za-zÀ-ÿ-]+$/.test(value);

    return valid ? null : { caracteresSpeciaux: true };
  };
}
