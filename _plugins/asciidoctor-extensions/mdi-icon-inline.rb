# ------------------------------------------------------------------------------
#  ~/_plugins/asciidoctor-extensions/mdi-icon-inline.rb
#  Asciidoctor extension for J1 Template
#
#  Product/Info:
#  https://jekyll.one
#
#  Copyright (C) 2019 Juergen Adams
#
#  J1 Template is licensed under the MIT License.
#  See: https://github.com/jekyll-one-org/j1-template/blob/master/LICENSE
#
# ------------------------------------------------------------------------------
require 'asciidoctor/extensions' unless RUBY_ENGINE == 'opal'
include Asciidoctor

Asciidoctor::Extensions.register do
  class MdiIconInlineMacro < Extensions::InlineMacroProcessor
    use_dsl
    named :mdi
    name_positional_attributes 'size', 'modifier'
    default_attrs 'size' => '1x', 'modifier' => 'md-black'

    def process parent, target, attributes
      doc = parent.document
      size_class = (size = attributes['size']) ? %( mdi-#{size}) : nil
      modifier_class = (modifier = attributes['modifier']) ? %( mdi-#{modifier}) : nil
      icon_name = target.tr '_', '-'
      %(<i class="mdi#{size_class} mdi-#{modifier} mdi-#{icon_name}"></i>)
    end
  end
  inline_macro MdiIconInlineMacro
end