package org.anyframe.hibernate.datatype;

import org.anyframe.hibernate.AbstractConfigurationalTransactionalTest;
import org.anyframe.sample.hibernate.model.datatype.SpecialChar;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

/**
 * TestCase Name : HibernateSpecialCharTest<br>
 * <br>
 * [Description] : It is checked special character is properly handled via
 * Hibernate.<br>
 * [Main Flow]
 * <ul>
 * <li>#-1 Positive Case : It is checked special character is properly handled
 * via Hibernate.</li>
 * <li>#-2 Positive Case : Data is modified and modification is checked by using
 * Entity object defining Special Character.</li>
 * <li>#-3 Positive Case : Data is deleted and deletion is checked by using
 * Entity object defining Special Character.</li>
 * </ul>
 * 
 * @author SoYon Lim
 */
@RunWith(JUnit4.class)
public class HibernateSpecialCharTest extends
		AbstractConfigurationalTransactionalTest {
	protected String getHibernateConfigLocation() {
		return "org/anyframe/hibernate/datatype/hibernate.cfg.xml";
	}

	/**
	 * [Flow #-1] Positive Case : It is checked special character is properly
	 * handled via Hibernate.
	 * 
	 * @throws Exception
     *         throws exception which is from hibernate
     */
    @Test
    public void testInsertSpecialChar() {
        // 1. insert init data
        SpecialChar soruce = insertSpecialChar();

        // 2. select a specialChar data
        SpecialChar specialChar =
            (SpecialChar) session.get(SpecialChar.class, new Integer(4491));

        // 3. assert result - timeDateType
        Assert.assertNotNull(specialChar);
        Assert.assertEquals(soruce.getSpecialCharA(), specialChar.getSpecialCharA());
        Assert.assertEquals(soruce.getSpecialCharB(), specialChar.getSpecialCharB());
        Assert.assertEquals(soruce.getSpecialCharC(), specialChar.getSpecialCharC());
        Assert.assertEquals(soruce.getSpecialCharD(), specialChar.getSpecialCharD());
        Assert.assertEquals(soruce.getSpecialCharE(), specialChar.getSpecialCharE());

    }

	/**
	 * [Flow #-2] Positive Case : Data is modified and modification is checked
	 * by using defined Entity object
     */
    @Test
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
        Assert.assertNotNull(specialChar);
        Assert.assertEquals("Α Β Γ Δ Ε Ζ Η Θ Ι Κ Λ", specialChar.getSpecialCharA());
    }

	/**
	 * [Flow #-3] Positive Case : Data is deleted and deletion is checked by
	 * using defined Entity object
     */
    @Test
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
        Assert.assertNull(specialChar);
    }

	/**
	 * Data is set with special character and added to DB. 
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
