
const SYSTEM_TIPS = {

    ACPI : {
        title : 'ACPI（高级配置和电源接口）是发现和配置计算机硬件的开放标准。ACPI 规范定义了标准表（例如 DSDT、SSDT、FACS、DMAR）和各种实现方法（例如_DSM、_PRW）。现代硬件只需很少更改才能保持 ACPI 兼容性，但其中一些硬件是作为 OpenCore 的一部分提供的。',

        Add : {
            title : '类型：plist 数组\n故障安全：空\n说明：从 OC/ACPI 目录中加载选定的表。\n\n1. 评论\n类型：plist 字符串\n故障安全：空字符串\n说明：用于为条目提供人类可读引用的任意 ASCII 字符串。是否使用此值是实现的。\n2. 已启用\n类型： 列表布尔\n故障安全：错误\n说明：除非设置为 true，否则不会添加此 ACPI 表。\n3. 路径\n类型：plist 字符串\n故障安全：空字符串\n说明：要作为 ACPI 表加载的文件路径。示例值包括 DSDT.aml、SubDir/SSDT-8.aml、SSDT-USBX.ml 等。'
        },

        Block : {
            title : '屏蔽ACPI (DSDT, SSDT) 表, (可以删除此项, 大多数用户都用不到)'
        },

        Patch : {
            title : '对 DSDT (SSDT) 的内容进行查找和替换'
        },

        Quirks : {
            title : 'ACPI 相关设置',
            FadtEnableReset : 'NO 在旧硬件上修复重启和关机, 除非需要, 否则不推荐开启',
            NormalizeHeaders: 'NO 清除 ACPI 头字段, 只有 macOS 10.13 需要',
            RebaseRegions: 'NO 尝试试探性地重新定位 ACPI 内存区域, 除非使用了自定义 DSDT, 否则不需要',
            ResetHwSig: 'NO 存在重新启动后因无法维持硬件签名而导致从休眠中唤醒的问题的硬件需要开启',
            ResetLogoStatus: 'NO 无法在有 BGRT 表的系统上显示 OEM Windows 标志的硬件需要开启'
        }

    },

    Booter : {
        title : '用于设置 FwRuntimeServices.efi (Slide 值计算, KASLR)',
        Quirks : {
            AvoidRuntimeDefrag: 'YES 修复 UEFI 的运行服务, 例如日期, 时间, NVRAM, 电源控制等',
            DevirtualiseMmio: 'NO 减少 Stolen 内存占用空间，扩大 Slide = N 值的范围，但可能与主板不兼容。通常用于 APTIO V 固件 (Broadwell +)',
            DisableSingleUser: 'NO 禁止 Cmd + S 和 -s 的使用，使设备更加接近于 T2 白苹果',
            DisableVariableWrite: 'NO 禁止 NVRAM 写入, 在 Z390/HM370 等没有原生 macOS 支持 NVRAM 的设备上需要开启',
            DiscardHibernateMap: 'NO 重用原始休眠内存映射，仅某些旧硬件需要',
            EnableSafeModeSlide: 'YES 允许在安全模式下使用 Slide 值',
            EnableWriteUnprotector: 'YES 在执行期间删除 CR0 寄存器中的写入保护',
            ForceExitBootServices: 'NO 确保 ExitBootServices 即使在 MemoryMap 发生更改时也能调用成功, 除非有必要, 否则请勿使用',
            ProtectCsmRegion: 'NO 用于修复人为制造和睡眠唤醒的问题, AvoidRuntimeDefrag 已经修复了这个问题所以请尽可能避免使用这个 Quirk',
            ProvideCustomSlide: 'YES 如果 Slide 值存在冲突, 此选项将强制 macOS 执行以下操作: 使用一个伪随机值。 只有在遇到 Only N/256 slide values are usable! 时需要',
            SetupVirtualMap: 'YES 将 SetVirtualAddresses 调用修复为虚拟地址',
            ShrinkMemoryMap: 'NO 有巨大且不兼容内存映射的主板需要开启, 非必须不要使用'
        },
        MmioWhitelist : {
            title : ''
        }
    },

    DeviceProperties : {
        title : '用于设置 PCI 设备属性, 如英特尔缓冲帧补丁, 声卡 Layout ID 不同的设备硬件地址不一样! 你需要先通过 Hackintool 或者 Windows 设备管理器 等工具查看 PCI 设备地址',
        Add : {
            title : '设置设备属性'
        },
        Block : {
            title : '用于删除设备属性 (可以删除此项, 大多数用户都用不到)'
        }

    },

    Kernel : {
        title : '用于说明 OpenCore 的具体加密信息, 配置 Kext 加载顺序以及屏蔽驱动',
        Add_title : '这里是你指定要加载哪些 Kext 以及仿冒 CPU ID 的地方, \n这里的顺序非常重要, 所以请确保 Lilu.Kext 始终在第一位! \n其他优先级更高的 Kext 为 Lilu 的插件, \n如 VirtualSMC, AppleALC, WhateverGreen 等。(有些驱动里面还包含插件驱动, 如: VoodooI2C, VoodooPS2 注意要把里面的插件也全部列出)',
        Block_title : '屏蔽系统里的 Kext',
        Patch_title : '这是你要添加系统内核补丁, Kext 补丁, 和 AMD CPU 补丁的地方。(等同于 Clover 的 KextToPatch 和 KernelToPatch)',
        Emulate_title : '小兵博客没写这项啊, 所以我也不知道',
        Quirks : {
            AppleCpuPmCfgLock: 'NO 仅在 BIOS 中无法禁用 CFG-Lock 时才需要',
            AppleXcpmCfgLock: 'NO 仅在 BIOS 中无法禁用 CFG-Lock 时才需要',
            AppleXcpmExtraMsrs: 'NO 禁用奔腾和某些至强等不支持 CPU 所需的多个 MSR 访问',
            CustomSMBIOSGuid: 'NO 对 UpdateSMBIOSMode 自定义模式执行 GUID 修补, 用于戴尔笔记本电脑 (等同于 Clover 的 DellSMBIOSPatch)',
            DisableIoMapper: 'NO 需要绕过 VT-d 且 BIOS 中禁用时使用',
            ExternalDiskIcons: 'YES 硬盘图标补丁, macOS 将内部硬盘视为外接硬盘 (黄色) 时使用',
            LapicKernelPanic: 'NO 禁用由 AP 核心 lapic 中断造成的内核崩溃, 通常用于惠普电脑 (等同于 Clover 的 Kernel LAPIC)',
            PanicNoKextDump: 'YES 在发生内核崩溃时阻止输出 Kext 列表, 提供可供排错参考的日志',
            ThirdPartyDrives: 'NO 将供应商修补程序应用于IOAHCIBlockStorage.kext，以启用第三方驱动器的本机功能，例如SSD上的TRIM或10.15及更高版本上的休眠支持',
            PowerTimeoutKernelPanic : 'YES 修复 macOS Catalina 中由于设备电源状态变化超时而导致的内核崩溃',
            XhciPortLimit: 'YES 这实际上是 15 端口限制补丁, 不建议依赖, 因为这不是 USB 的最佳解决方案。有能力的情况下请选择定制 USB, 这个选项用于没有定制 USB 的设备'
        },
        Emulate : {
            Cpuid1Data : '为不支持的CPU进行仿冒以加载电源管理,比如Haswell-E的处理器为: F2060300 00000000 00000000 00000000',
            Cpuid1Mask : '为不支持的CPU进行仿冒以加载电源管理,比如Haswell-E的处理器为: 010A0000 00000000 00000000 00000000'
        }
    },

    Misc : {
        title : '用于 OpenCore 的自身设置',
        Boot_title: '引导界面的设置 (保持原样, 除非你知道你在做什么)',
        Debug_title: 'Debug 有特殊用途, 除非你知道你在做什么, 否则保持原样',
        Security_title: '安全',
        Tools_title :  '用于运行 OC 调试工具, 例如验证 CFG 锁 (VerifyMsrE2)',
        Entires_title: '用于指定 OpenCore 无法自动找到的无规律引导路径',

        Boot : {
            HibernateMode: 'None 最好避免与黑苹果一同休眠',
            HideSelf: 'YES 在 OpenCore 的启动选择中隐藏自身 EFI 分区的启动项',
            PollAppleHotKeys: 'YES 允许在引导过程中使用苹果原生快捷键, 需要与 AppleGenericInput.efi 或 UsbKbDxe.efi 结合使用, 具体体验取决于固件',
            Timeout: '5 设置引导项等待时间',
            ShowPicker: 'YES 显示 OpenCore 的 UI, 用于查看可用引导项, 设置为 NO 可以和 PollAppleHotKeys 配合提升体验',
            UsePicker: 'YES 使用 OpenCore 的默认 GUI, 如果您希望使用其他 GUI (暂时没有), 则设置为 NO',
            ConsoleBehaviourOs : '在操作系统负载时设置控制台控制行为',
            ConsoleBehaviourUi : '在OpenCore用户界面加载时设置控制台控件行为。有关详细信息，请参考ConsoleBehaviourOs描述',
            ConsoleMode : '大多数固件上最好将此字段留空',
            Resolution : '设置控制台输出屏幕分辨率, 如:1920x1080@32, 1920x1080, Max 或者 直接留空'
        },
        Debug : {
            DisableWatchDog : 'NO 某些固件可能无法成功快速启动操作系统，尤其是在调试模式下，这会导致看门狗定时器中止该过程。此选项关闭看门狗计时器',
            DisplayDelay : '0 屏幕上显示每条打印线后执行的微秒延迟',
            DisplayLevel : '0 屏幕上显示了EDK II调试级别位掩码（总和）。除非Target启用控制台（屏幕上）打印，否则屏幕上的调试输出将不可见',
            Target : '0 启用的日志记录目标的位掩码（总和）。默认情况下，所有日志记录输出都是隐藏的，因此在需要调试时需要设置此选项'
        },
        Security : {
            AllowNvramReset : 'NO 允许CMD + OPT + P + R处理并在引导选择器中启用显示NVRAM重置条目',
            RequireSignature : 'YES OC目录中的vault.plist需要vault.sig签名文件',
            RequireVault : 'YES 要求OC目录中存在vault.plist文件',
            ExposeSensitiveData : '操作系统的敏感数据公开位掩码（总和）',
            HaltLevel : 'EDK II调试级别位掩码（总和）在获取HaltLevel消息后导致CPU停止（停止执行）。可能的值与DisplayLevel值匹配',
            ScanPolicy : '定义操作系统检测策略'
        }

    },

    NVRAM : {
        title : '用于注入 NVRAM (如引导标识符和 SIP)',
        LegacyEnable: 'NO 启用从EFI卷根目录加载名为nvram.plist的NVRAM变量文件<br>1 没有原生 NVRAM 的设备设置为 YES<br>2 macOS 下硬件 NVRAM 工作「不」正常的设备设置为 YES<br>3 macOS 下硬件 NVRAM 工作正常的设备设置为'
    },

    PlatformInfo : {
        title:'用于设置 SMBIOS 机型信息',
        configisfull : '如果你打算使用的 SMBIOS 苹果已经停止支持(2011年或更早)或者你是用的是戴尔 OEM 笔记本, 那么请先勾选这里并「认真」补全所有 SMBIOS 信息, 然后再点击 下载 或者 复制 按钮',
        root : {
            UpdateSMBIOSMode : '更新SMBIOS字段方法',
            Create : '将表替换为在AllocateMaxAddress处新分配的EfiReservedMemoryType，而没有任何后备',
            TryOverwrite : '如果新大小小于对齐页面的原始大小，则覆盖，并且旧版区域解锁没有问题。否则创建。某些固件有问题',
            Overwrite : '如果适合新大小，则覆盖现有的gEfiSmbiosTableGuid和gEfiSmbiosTable3Guid数据。否则以未指定状态中止',
            Custom : '将第一个SMBIOS表（gEfiSmbiosTableGuid）写入gOcCustomSmbiosTableGuid，以解决固件在ExitBootServices覆盖SMBIOS内容的问题。否则等效于创建。要求修补AppleSmbios.kext和AppleACPIPlatform.kext以便从另一个GUID读取：“ EB9D2D31”-“ EB9D2D35”（ASCII），由CustomSMBIOSGuid自动完成',
            Automatic : 'NO 根据通用部分而不是使用DataHub，NVRAM和SMBIOS部分的值生成PlatformInfo',
            UpdateDataHub : 'NO 更新数据中心字段。这些字段是根据“Automatic”值从“Generic”或“DataHub”部分读取的',
            UpdateNVRAM : '更新与平台信息有关的NVRAM字段',
            UpdateSMBIOS : '更新SMBIOS字段。这些字段是从“Generic”或“SMBIOS”部分读取的，具体取决于“Automatic”值',
            SpoofVendor : 'YES 仿冒制造商为 Acidanthera 来避免出现冲突'
        },

        Generic : {
            SystemProductName : '',
            MLB : '用 macserial 读取或生成',
            ROM : '可以是任意 6 Byte MAC 地址, 如 0x112233000000',
            SystemProductName : '用 macserial 读取或生成',
            SystemSerialNumber : '用 macserial 读取或生成',
            SystemUUID : '填入设备的硬件 UUID 以免造成 Windows 和其它软件的激活问题 (官方不再建议留空)'

        }
    },

    UEFI : {
        title : '用于加载 UEFI 驱动以及以何种顺序加载',
        ConnectDrivers: 'YES 强制加载 .efi 驱动程序, 更改为 NO 将自动连接 UEFI 驱动程序, 这样以获得更快的启动速度, 但并非所有驱动程序都可以自行连接, 某些文件系统驱动程序可能无法加载',
        Drivers: '在这里添加你的 .efi 驱动',
        Input : {
            KeyForgetThreshold: '5 按住按键后每个键之间的时间间隔 (单位: 毫秒)',
            KeyMergeThreshold: '2 按住按键被重置的时间间隔 (单位: 毫秒)',
            KeySupport: 'YES 开启 OC 的内置键盘支持 使用 UsbKbDxe.efi 请设置为 NO',
            KeySupportMode: 'Auto 键值转换协议模式 V1: UEFI 旧版输入协议    V2: UEFI 新输入协议',
            KeySwap: 'NO 交换 Command 和 Option 键',
            PointerSupport: 'NO 修复 UEFI 选择器协议',
            PointerSupportMode: '留空 设置用于内部指针驱动程序的OEM协议 ',
            TimerResolution: '50000 固件时钟刷新的频率 (单位: 100纳秒) 华硕主板为自己的界面使用 60000 苹果使用 100000'
        },

        Protocols : {
            AppleBootPolicy: 'NO 用于确保虚拟机或旧白苹果上兼容 APFS',
            AppleEvent : 'NO 重新安装具有内置版本的Apple Event协议。这可用于确保VM或旧版Mac上的File Vault 2兼容性。',
            AppleImageConversion : 'NO 重新安装具有内置版本的Apple Image Conversion协议',
            AppleKeyMap : 'NO 安装具有内置版本的Apple Key Map协议',
            AppleUserInterfaceTheme : 'NO 重新安装具有内置版本的Apple用户界面主题协议',
            ConsoleControl: 'YES macOS 引导加载程序基于文本输出的控制台控制协议, 某些固件缺少该协议。当协议已经在固件中可用时, 需要设置此选项, 并且使用其他控制台控制选项, 例如 IgnoreTextInGraphics, SanitiseClearScreen 以及 ConsoleBehaviourUi 的 ConsoleBehaviourOs',
            DataHub: 'NO 重新安装数据库',
            DeviceProperties: 'NO 确保在 VM 或旧白苹果上完全兼容',
            FirmwareVolume: 'NO 修复 Filevault 的 UI 问题, 设置为 YES 可以获得更好地兼容 FileVault',
            HashServices: 'NO 修复运行 FileVault 时鼠标光标大小不正确的问题, 设置为 YES 可以更好地兼容 FileVault',
            UnicodeCollation: 'NO 一些较旧的固件破坏了 Unicode 排序规则, 设置为 YES 可以修复这些系统上 UEFI Shell 的兼容性 (通常为用于 IvyBridge 或更旧的设备)'
        },
        Quirks : {
            AvoidHighAlloc:'NO 主板无法正确访问 UEFI Boot Services 中更高内存的解决方法。除非有必要, 否则避免使用',
            ClearScreenOnModeSwitch : 'NO 从图形模式切换到文本模式时, 某些固件仅清除屏幕的一部分, 导致屏幕上残留之前绘制的图片。 此选项会在切换到文本模式之前用黑色填充整个屏幕',
            IgnoreInvalidFlexRatio : 'NO BIOS 中无法禁用 MSR_FLEX_RATIO(0x194) 时开启',
            IgnoreTextInGraphics : 'NO 修复不用 -v 开机时日志覆盖苹果标志输出的问题',
            ProvideConsoleGop : 'YES macOS 引导加载程序要求 GOP (图形输出协议) 存在于控制台句柄上 如果选择启动项之后不出现 macOS 启动 Verbose 请启用',
            ReconnectOnResChange : 'NO 有些固件在 GOP 分辨率改变后要求重新连接控制器才能输出文本, 开启这个选项会导致从 UEFI Shell 中启动 OpenCore 时直接黑屏, 尽量避免开启',
            ReleaseUsbOwnership : 'NO 从固件驱动程序中释放 USB 控制器所属权, 除非您不知道自己在做什么, 否则避免使用。Clover 的等效设置是 FixOwnership',
            ReplaceTabWithSpace : 'NO 取决于固件, 某些设备在 UEFI Shell 中编辑文件使用 Tab键 出问题时启用。注意, 此选项需要将 ConsoleControl 设置为 YES',
            RequestBootVarFallback : 'NO 请求将某些Boot前缀变量从OC_VENDOR_VARIABLE_GUID回退到EFI_GLOBAL_VARIABLE_GUID',
            RequestBootVarRouting : 'YES 从 EFI_GLOBAL_VARIABLE_GUID 中为 OC_VENDOR_VARIABLE_GUID 请求 redirectBoot 前缀变量 <br>启用此项以便能够在与 macOS 引导项设计上不兼容的固件中可靠地使用 启动磁盘 设置',
            SanitiseClearScreen : 'YES 修复 OpenCore 在高分屏中以 1024x768 显示的问题, 注意要同时开启 ConsoleControl 并将 ConsoleMode 的内容留空',
            UnblockFsConnect : 'NO 惠普笔记本在 OpenCore 引导界面没有引导项时设置为 YES',
            ExitBootServicesDelay : '在EXIT_BOOT_SERVICES事件后增加延迟（以微秒为单位）'
        }
    }


};