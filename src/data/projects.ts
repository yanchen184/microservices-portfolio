export interface TechStack {
  category: string;
  technologies: string[];
}

export interface Challenge {
  title: string;
  description: string;
  solution: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  techStack: TechStack[];
  challenges: Challenge[];
  flowDescription: string;
}

export const projects: Project[] = [
  {
    id: 'warehouse',
    name: '智能倉儲系統',
    description: '提供倉儲操作、揀貨管理、ELK 監控等功能，實現智能化倉儲管理',
    icon: '📦',
    features: [
      '倉儲操作介面（入庫/出庫作業）',
      '智能揀貨路徑優化',
      '揀貨錯誤報告與追蹤',
      'ELK Stack 日誌監控與分析',
      '與硬體設備介面對接（掃描器、輸送帶）',
      '即時庫存狀態更新',
    ],
    techStack: [
      {
        category: '後端',
        technologies: ['Spring Boot', 'Spring Data JPA', 'Hibernate', 'MySQL', 'Redis', 'RabbitMQ'],
      },
      {
        category: '前端',
        technologies: ['React', 'TypeScript', 'Ant Design', 'Redux Saga', 'Tailwind CSS'],
      },
      {
        category: '監控/部署',
        technologies: ['Elasticsearch', 'Logstash', 'Kibana', 'Docker', 'Kubernetes', 'GitLab CI/CD'],
      },
    ],
    challenges: [
      {
        title: '高並發揀貨操作性能瓶頸',
        description: '高峰期訂單量大增時，揀貨系統回應速度明顯下降，導致操作員等待時間過長',
        solution: '使用 Redis 緩存熱門商品位置資訊，並採用 RabbitMQ 異步處理揀貨任務，將同步查詢改為消息驅動架構',
      },
      {
        title: '硬體設備介面不穩定',
        description: '倉儲硬體設備（如條碼掃描器、自動輸送帶）偶爾出現連接中斷或回應超時問題',
        solution: '實現智能重試機制和斷線重連邏輯，配合 ELK 實時監控設備狀態，並在異常時立即告警',
      },
      {
        title: '大量日誌導致查詢效率低',
        description: 'ELK 系統累積海量日誌後，查詢速度明顯變慢，影響故障排查效率',
        solution: '優化 Elasticsearch 索引策略，採用按日期分片存儲，並設定自動清理舊日誌的策略',
      },
    ],
    flowDescription: '操作員透過前端介面發起入庫/出庫請求 → Spring Boot API 驗證並處理 → 寫入 MySQL 持久化 → 透過 RabbitMQ 異步通知訂單服務和庫存服務 → ELK Stack 實時監控操作日誌 → 硬體設備透過介面接收指令執行作業',
  },
  {
    id: 'order',
    name: '訂單管理系統',
    description: '處理訂單生命週期，從創建、支付、配送到完成，整合多個服務協作',
    icon: '📝',
    features: [
      '訂單創建與狀態追蹤',
      '多種支付方式整合',
      '訂單配送追蹤',
      '訂單歷史查詢與統計',
      '異常訂單處理機制',
      '訂單優先級管理',
    ],
    techStack: [
      {
        category: '後端',
        technologies: ['Spring Boot', 'Spring Data JPA', 'MySQL', 'Redis', 'RabbitMQ'],
      },
      {
        category: '前端',
        technologies: ['React', 'TypeScript', 'Ant Design', 'Redux Toolkit'],
      },
      {
        category: '部署',
        technologies: ['Docker', 'Kubernetes', 'GitLab CI/CD'],
      },
    ],
    challenges: [
      {
        title: '訂單高峰期系統延遲',
        description: '促銷期間訂單量暴增，同步查詢庫存和計算運費導致系統回應時間超過 5 秒',
        solution: '將庫存檢查和運費計算改為異步處理，使用 RabbitMQ 發送消息，並透過 Redis 緩存常用配送地區的運費數據',
      },
      {
        title: '分散式事務一致性問題',
        description: '訂單創建涉及多個服務（庫存扣減、支付、物流），如何保證數據一致性',
        solution: '採用 Saga 模式實現分散式事務，每個步驟完成後發送事件，失敗時執行補償操作',
      },
    ],
    flowDescription: '用戶提交訂單 → 訂單服務創建訂單記錄 → 透過 REST API 檢查庫存可用性 → 透過 RabbitMQ 發送揀貨任務給倉儲系統 → 更新訂單狀態 → 通知物流系統安排配送',
  },
  {
    id: 'hr',
    name: '人力管理系統',
    description: '管理員工資料、排班、考勤、績效評估等人力資源相關功能',
    icon: '👥',
    features: [
      '員工資料管理',
      '智能排班系統',
      '考勤打卡與統計',
      '假期申請與審批',
      '績效評估系統',
      '薪資計算與報表',
    ],
    techStack: [
      {
        category: '後端',
        technologies: ['Spring Boot', 'JPA', 'Hibernate', 'MySQL'],
      },
      {
        category: '前端',
        technologies: ['React', 'TypeScript', 'Ant Design', 'Jotai'],
      },
      {
        category: '部署',
        technologies: ['Docker', 'Kubernetes'],
      },
    ],
    challenges: [
      {
        title: '複雜排班規則實現',
        description: '需要考慮員工技能、工作時段偏好、法定休息時間等多重約束條件',
        solution: '使用規則引擎（Drools）處理複雜排班邏輯，並提供手動調整介面供管理者微調',
      },
      {
        title: '跨系統員工資料同步',
        description: '員工資料需要同步到 CMS 系統展示，並影響訂單系統的操作員權限',
        solution: '透過 REST API 提供員工資料查詢介面，並在資料變更時透過 RabbitMQ 發送事件通知相關系統',
      },
    ],
    flowDescription: '管理者透過前端設定排班規則 → 系統自動生成排班表 → 員工打卡記錄寫入資料庫 → 定期計算考勤統計 → 透過 REST API 將員工資料同步給 CMS 系統',
  },
  {
    id: 'cms',
    name: 'CMS 內容管理系統',
    description: '統一管理和展示各系統的內容、配置、報表等資訊',
    icon: '⚙️',
    features: [
      '系統配置管理',
      '報表生成與展示',
      '用戶權限管理',
      '內容發布與審核',
      '數據大屏展示',
      '系統公告管理',
    ],
    techStack: [
      {
        category: '後端',
        technologies: ['Spring Boot', 'MySQL', 'Redis'],
      },
      {
        category: '前端',
        technologies: ['React', 'TypeScript', 'Ant Design', 'Redux Slice', 'ECharts'],
      },
      {
        category: '部署',
        technologies: ['Docker', 'Kubernetes', 'GitLab CI/CD'],
      },
    ],
    challenges: [
      {
        title: '複雜報表查詢性能問題',
        description: '多表聯合查詢生成報表時，查詢時間超過 10 秒，影響用戶體驗',
        solution: '使用 Redis 緩存常用報表數據，並在非高峰期預先生成報表快照，實時報表採用分頁加載',
      },
      {
        title: '動態權限管理',
        description: '不同角色需要不同的功能權限，權限規則頻繁變更',
        solution: '實現 RBAC（基於角色的訪問控制）模型，權限配置存儲在資料庫中，支持動態調整無需重新部署',
      },
    ],
    flowDescription: '管理員透過 CMS 配置系統參數 → 資料存入 MySQL → 其他系統透過 REST API 查詢配置 → 使用 Redis 緩存提升查詢速度 → ECharts 視覺化展示各系統運營數據',
  },
  {
    id: 'inventory',
    name: '庫存管理系統',
    description: '實時追蹤庫存狀態，管理進貨、出貨、庫存盤點等作業',
    icon: '📊',
    features: [
      '即時庫存追蹤',
      '庫存預警機制',
      '自動補貨建議',
      '庫存盤點功能',
      '批次管理與追溯',
      '庫存報表分析',
    ],
    techStack: [
      {
        category: '後端',
        technologies: ['Spring Boot', 'JPA', 'Hibernate', 'MySQL', 'Redis'],
      },
      {
        category: '前端',
        technologies: ['React', 'TypeScript', 'Ant Design', 'Tailwind CSS'],
      },
      {
        category: '部署',
        technologies: ['Docker', 'Kubernetes'],
      },
    ],
    challenges: [
      {
        title: '高並發庫存扣減一致性',
        description: '多個訂單同時請求扣減同一商品庫存時，可能出現超賣問題',
        solution: '使用 Redis 分散式鎖確保庫存扣減的原子性，配合樂觀鎖機制防止並發衝突',
      },
      {
        title: '庫存數據實時同步',
        description: '倉儲操作、訂單創建都會影響庫存，如何保證各系統看到的庫存數據一致',
        solution: '採用事件驅動架構，庫存變更時透過 RabbitMQ 發送事件，訂閱者更新本地緩存或資料庫',
      },
    ],
    flowDescription: '倉儲系統完成入庫 → 透過 REST API 更新庫存數量 → 庫存服務寫入 MySQL 並發送 RabbitMQ 事件 → 訂單服務接收事件更新可用庫存緩存 → 庫存低於安全值時自動發送預警',
  },
];

export const serviceConnections = [
  {
    id: 'warehouse-order',
    source: 'warehouse',
    target: 'order',
    type: 'RabbitMQ',
    description: '揀貨完成通知',
    animated: true,
  },
  {
    id: 'order-warehouse',
    source: 'order',
    target: 'warehouse',
    type: 'RabbitMQ',
    description: '發送揀貨任務',
    animated: true,
  },
  {
    id: 'order-inventory',
    source: 'order',
    target: 'inventory',
    type: 'REST API',
    description: '檢查庫存可用性',
    animated: false,
  },
  {
    id: 'warehouse-inventory',
    source: 'warehouse',
    target: 'inventory',
    type: 'REST API',
    description: '更新庫存數量',
    animated: false,
  },
  {
    id: 'inventory-order',
    source: 'inventory',
    target: 'order',
    type: 'RabbitMQ',
    description: '庫存變更事件',
    animated: true,
  },
  {
    id: 'hr-cms',
    source: 'hr',
    target: 'cms',
    type: 'REST API',
    description: '員工資料同步',
    animated: false,
  },
  {
    id: 'warehouse-cms',
    source: 'warehouse',
    target: 'cms',
    type: 'REST API',
    description: '發送操作日誌',
    animated: false,
  },
  {
    id: 'hr-warehouse',
    source: 'hr',
    target: 'warehouse',
    type: 'REST API',
    description: '操作員權限查詢',
    animated: false,
  },
];
