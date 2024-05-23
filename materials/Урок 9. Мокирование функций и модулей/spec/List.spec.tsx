describe('Список задач', () => {
    it.todo('Список не может содержать больше 10 невыполненных задач');
    it.todo('При отсутствии задач в списке');

    it('Есть выполненый пример', () => {
        expect([
            { label: 'Купить молока', done: false },
            { label: 'Выгулять собаку', done: false },
        ]).toContainEqual(expect.not.toHaveDoneItem());
    });
});