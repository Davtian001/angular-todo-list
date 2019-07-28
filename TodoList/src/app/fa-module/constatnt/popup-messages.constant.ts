
// ----Fa----
export const logOut = function(): string[] {
    return [`Are you sure ?`]
}

export const resetPassSucces = function(email: string): string[] {
    return [`Password reset link has been sent to ${email}.`,`Checkout your email to set new password.`]
}

export const resetPassFail = function(email: string): string[] {
    return [`${email} wasn't registered on Mode-Concept.`,`Please type email of your account.`]
}


// ---Tasks---
export const deleteTask = function(name: string = ''): string[] {
    return [`Delete Task <${name}> ?`]
}
export const editTask = function(name: string = ''): string[] {
    return [`Edit Task <${name}> ?`]
}

