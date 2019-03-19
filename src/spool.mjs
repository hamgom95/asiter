// spool coroutine generator to first yield
export const spool = cor => (cor.next(), cor);
