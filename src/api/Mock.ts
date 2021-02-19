export class Mock {
    static login(username: string, password: string): Promise<'token!'> {
        if (password === '1234') {
            return new Promise((res) => {
                setTimeout(() => res('token!'), 1500);
            });
        } else {
            return new Promise((_, rej) => {
                setTimeout(
                    () => rej('Not correct password, test "1234"'),
                    1500,
                );
            });
        }
    }
}
