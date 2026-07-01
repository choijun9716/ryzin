const fs = require('fs');
let file = '/Users/chaeijun/Downloads/ryzin-main 2/admin_src/src/data/seed.js';
let content = fs.readFileSync(file, 'utf8');

const dummyCRM = `
export const initialData = {
  crmClients: [
    {
      id: 'crm_1',
      companyName: '(주)뷰티코스',
      contactName: '김지현 대리',
      phone: '010-1234-5678',
      email: 'jh.kim@beautycos.com',
      source: '자사몰 인바운드',
      interestedService: '풀패키지 방송',
      status: 'new',
      category: 'A',
      memo: '신제품 런칭 방송 원함. 견적서 필요.',
      lastContactDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 8일 전
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'crm_2',
      companyName: '푸드마켓',
      contactName: '이성민 팀장',
      phone: '010-9876-5432',
      email: 'sm.lee@foodmarket.co.kr',
      source: '지인 소개',
      interestedService: '스튜디오 대관 및 촬영',
      status: 'quote',
      category: 'B',
      memo: '견적서 송부 완료. 다음주 회신 예정.',
      lastContactDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 4일 전
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    }
  ],
  crmActivities: [
    {
      id: 'act_1',
      clientId: 'crm_1',
      date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      type: 'phone',
      content: '첫 전화 상담. 예산 및 일정 확인 후 상세 내용 전달하기로 함.',
      followUpDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'act_2',
      clientId: 'crm_2',
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      type: 'email',
      content: '요청하신 A/B 타입 견적서 이메일로 발송함.',
      followUpDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    }
  ],
`;

content = content.replace(`export const initialData = {`, dummyCRM);
fs.writeFileSync(file, content);
