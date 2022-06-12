import mountTemplate from 'test/utils/mountTemplate'
import MdMenu from './MdMenu.vue'

test('should render the menu', async () => {
  const template = '<md-menu2>Lorem ipsum</md-menu>'
  const wrapper = await mountTemplate(MdMenu, template)

  expect(wrapper.hasClass('md-menu')).toBe(true)
})
