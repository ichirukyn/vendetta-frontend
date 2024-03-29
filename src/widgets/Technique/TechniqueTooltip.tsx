import { FC } from 'react';

const TechniqueTooltip: FC = () => {
  return (
    <div className="block_column align-start card brs_10 maxw_450">
      <h6>Подсказки:</h6>
      <p>
        <b>Урон</b> - Считается в процентах.
      </p>
      <p>
        <b>Модификатор стихии</b> - добавляет зависимость от стихии к технике. То есть, если у игрока прокачана эта стихия, то урон
        будет умножатся на это значение.
      </p>
      <p>
        <b>Привязка</b> - Если не выбран класс/раса, то техника доступна всем
      </p>
      <p>
        <b>КД</b> - время восстановления техники. Если 0, то технику можно использовать каждый ход.
      </p>
      <p>
        <b>Стаки</b> - Если Включено, то эффекты техники будут складыватся между собой на цели.
      </p>
      
      <p className='text_body text_vBold'>Пример эффектов:</p>
      <p>
        <b><i>Простое усиление характеристики:</i></b>
        <br/>
        <b>Тип эффекта</b> - Число/Процент, в зависимости от нужного усиления.
        <br/>
        Например для эффекта "Силу +10 ед.", достаточно выбрать "Тип эффекта" - Число, "Атрибут" - Сила, "Значение" - 10 ед.
        <br/>
        Для эффектов "Сила +10%", нужно только поменять "Тип эффекта" на процент.
        <br/>
        <br/>
        <b>Тип эффекта</b> - Контроль/Период. урон имеют другое свойство у "Значение". Вместо единиц/процента усиления, это становится
        базовым шансом попадания эффектов и считается в процентах.
        <br/>
        <br/>
        Например, простое Кровотечение, выглядит так:
        <br/>
        <b>"Тип эффекта"</b> - Периодический урон.
        <br/>
        <b>"Атрибут"</b> - Физический урон (Ну или если это лезвия ветра, то вместо физ. урона, поставить "Ветер").
        <br/>
        <b>"Значение"</b> (Шанс попадания эффектов)" - 1 (1 = 100%, 1.2 = 120%, пока это значит, что со 100% гарантией будет наложен
        данный
        эффект на противника. Но, если у противника есть усиление на сопротивление эффектов, то шанса в 100% может не хватить)
        <br/>
        <br/>
        Это так же работает для контроля, но с поправкой, что "Атрибут", вместо периодического урона, принимает тип контроля
      </p>
    </div>
  );
};

export default TechniqueTooltip;