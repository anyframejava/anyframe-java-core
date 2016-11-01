package org.anyframe.hibernate.datatype;

import org.anyframe.hibernate.AbstractConfigurationalTransactionalTest;
import org.anyframe.sample.hibernate.model.datatype.SpecialChar;
import org.anyframe.sample.hibernate.model.datatype.TimeDateType;


/**
 * TestCase Name : HibernateSpecialCharTest<br>
 * <br>
 * [Description] : Hibernate을 통해 특수 문자가 제대로 처리되는지 확인한다.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : Hibernate을 통해 특수 문자가 제대로
 * 처리되는지 확인한다.</li>
 * <li>#-2 Positive Case : Special Character가 정의된
 * Entity 객체를 이용하여 데이터를 수정하고 수정 여부를 확인한다.</li>
 * <li>#-3 Positive Case : Special Character가 정의된
 * Entity 객체를 이용하여 데이터를 삭제하고 삭제 여부를 확인한다.</li>
 * </ul>
 * @author SoYon Lim
 */
public class HibernateSpecialCharTest extends
        AbstractConfigurationalTransactionalTest {
    protected String getHibernateConfigLocation() {
        return "org/anyframe/hibernate/datatype/hibernate.cfg.xml";
    }

    /**
     * [Flow #-1] Positive Case : Hibernate을 통해 특수 문자가
     * 제대로 처리되는지 확인한다.
     * @throws Exception
     *         throws exception which is from hibernate
     */
    public void testInsertSpecialChar() {
        // 1. insert init data
        SpecialChar soruce = insertSpecialChar();

        // 2. select a specialChar data
        SpecialChar specialChar =
            (SpecialChar) session.get(SpecialChar.class, new Integer(4491));

        // 3. assert result - timeDateType
        assertNotNull(specialChar);
        assertEquals(soruce.getSpecialCharA(), specialChar.getSpecialCharA());
        assertEquals(soruce.getSpecialCharB(), specialChar.getSpecialCharB());
        assertEquals(soruce.getSpecialCharC(), specialChar.getSpecialCharC());
        assertEquals(soruce.getSpecialCharD(), specialChar.getSpecialCharD());
        assertEquals(soruce.getSpecialCharE(), specialChar.getSpecialCharE());

    }

    /**
     * [Flow #-2] Positive Case : Special Character가
     * 정의된 Entity 객체를 이용하여 데이터를 수정하고 수정 여부를 확인한다.
     */
    public void testUpdateSpecialChar() {
        // 1. insert init data
        insertSpecialChar();

        // 2. select a specialChar data
        SpecialChar specialChar =
            (SpecialChar) session.get(SpecialChar.class, new Integer(4491));

        // 3. update data
        specialChar.setSpecialCharA("Α Β Γ Δ Ε Ζ Η Θ Ι Κ Λ");
        session.update(specialChar);

        // 4. check if update is successful
        specialChar =
            (SpecialChar) session.get(SpecialChar.class, new Integer(4491));
        assertNotNull(specialChar);
        assertEquals("Α Β Γ Δ Ε Ζ Η Θ Ι Κ Λ", specialChar.getSpecialCharA());
    }

    /**
     * [Flow #-3] Positive Case : Special Character가
     * 정의된 Entity 객체를 이용하여 데이터를 삭제하고 삭제 여부를 확인한다.
     */
    public void testDeleteSpecialChar() {
        // 1. insert init data
        insertSpecialChar();

        // 2. select a specialChar data
        SpecialChar specialChar =
            (SpecialChar) session.get(SpecialChar.class, new Integer(4491));

        // 3. remove data
        session.delete(specialChar);

        // 4. check if deletion is successful
        specialChar =
            (SpecialChar) session.get(SpecialChar.class, new Integer(4491));
        assertNull(specialChar);
    }

    /**
     * 특수 문자를 데이터를 셋팅하고 DB에 추가한다.
     * @return SpecialChar
     */
    public SpecialChar insertSpecialChar() {
        SpecialChar specialChar = new SpecialChar();
        specialChar.setId(4491);
        specialChar.setSpecialCharA("！ ＇ ， ． ／ ： ； ？ ＾ ＿ ｀ ｜ "
            + "￣ 、 。 · ‥ … ¨  〃 ­  ― ∥ ＼ ∼ ´ ～ ˇ " + "˘ ˝  ˚ ˙ ¸ ˛ ¡ ¿ ː");
        specialChar.setSpecialCharB("＂ （ ） ［ ］ ｛ ｝ ‘ ’ “ ” "
            + " 〔 〕 〈 〉 《 》 「 」 『 』" + " 【 】");
        specialChar.setSpecialCharC("＋ － ＜ ＝  ＞ ± × ÷ ≠ ≤ ≥ ∞ ∴"
            + " ♂ ♀ ∠ ⊥ ⌒ ∂   ∇ ≡ ≒ ≪ ≫ √ ∽ ∝ "
            + "∵ ∫ ∬ ∈ ∋ ⊆ ⊇ ⊂ ⊃ ∪ ∩ ∧ ∨ ￢ ⇒ " + "⇔ ∀ ∃ ∮ ∑ ∏");
        specialChar
            .setSpecialCharD("＄ ％ ￦ Ｆ ′  ″ ℃ Å ￠ ￡ ￥ ¤  ℉ ‰ "
                + "€ ㎕ ㎖ ㎗ ℓ ㎘   ㏄ ㎣ ㎤ ㎥ ㎦ ㎙ ㎚ ㎛ "
                + "㎜ ㎝ ㎞ ㎟ ㎠ ㎡ ㎢ ㏊ ㎍ ㎎ ㎏ ㏏ ㎈ ㎉ "
                + "㏈ ㎧ ㎨ ㎰ ㎱ ㎲ ㎳ ㎴ ㎵ ㎶ ㎷ ㎸ ㎹ ㎀ ㎁ ㎂ ㎃ ㎄ ㎺ ㎻ ㎼ ㎽ ㎾ ㎿ ㎐ ㎑ ㎒ ㎓ ㎔ Ω ㏀ ㏁ ㎊ ㎋ ㎌ ㏖ ㏅ ㎭ ㎮ ㎯ ㏛ ㎩ ㎪ ㎫ ㎬ ㏝ ㏐ ㏓ ㏃ ㏉ ㏜ ㏆");
        specialChar.setSpecialCharE("＃ ＆ ＊ ＠ § ※ ☆ ★ ○ ● ◎ ◇ ◆ □ ■ △ ▲"
            + " ▽ ▼ → ← ↑ ↓ ↔ 〓 ◁ ◀ ▷ ▶ ♤ ♠ ♡ ♥ ♧ ♣ ⊙ ◈ ▣ ◐"
            + " ◑ ▒ ▤ ▥ ▨ ▧ ▦ ▩ ♨ ☏ ☎ ☜ ☞ ¶  † "
            + "‡ ↕ ↗ ↙ ↖ ↘♭ ♩ ♪ ♬ ㉿ ㈜ № ㏇ ™ ㏂ ㏘ ℡ ® ª º");

        session.save(specialChar);

        return specialChar;
    }
}
